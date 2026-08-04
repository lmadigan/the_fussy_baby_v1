/**
 * Cloudflare Worker for the model-driven contributor assessment.
 * The Worker owns the API key and constrains model output to the Playbook.
 */

const PLAYBOOK = [
  ["food-protein-sensitivity", "Food Protein Sensitivity", "A cluster of stool, skin, feeding, and reflux-like signs; blood-streaked stool is important supporting evidence."],
  ["silent-reflux", "Silent Reflux", "Discomfort during or after feeds, arching, wet burps, or difficulty lying flat."],
  ["tongue-tie", "Tongue Tie / Oral Restriction", "Clicking, leaking, feeding effort, latch pain, and ineffective milk transfer."],
  ["forceful-letdown", "Oversupply / Forceful Letdown", "Fast milk flow, gulping, pulling off, air intake, and foamy or green stools."],
  ["microbiome", "Gut Microbiome Disruption", "Birth, antibiotic, feeding, and digestive context with evolving evidence."],
  ["digestive-immaturity", "Immature Digestive System", "Common digestive immaturity, straining, knees to chest, and evening discomfort."],
  ["sensory-overload", "Sensory Overload", "Short naps, busy days, difficulty settling, and evening fussiness."],
  ["structural-tension", "Structural Tension", "Persistent asymmetry, body tension, head preference, or feeding-position difficulty; evidence for proposed treatments is limited."],
];
const ALLOWED_IDS = new Set(PLAYBOOK.map(([id]) => id));
const playbookPrompt = PLAYBOOK.map(([id, name, description]) => `- ${id}: ${name}. ${description}`).join("\n");

const SYSTEM_PROMPT = `You help a parent organize observations about a fussy young baby. Your job is to rank possible CONTRIBUTORS for education and structured investigation, not to diagnose.

You may select only from this Playbook:
${playbookPrompt}

Rules:
- Return one strongest match and no more than two additional contributors. Multiple contributors can coexist.
- Use calm, direct language that a tired parent can scan.
- Explain both supporting evidence and limitations. Generic signs such as spit-up, gas, or fussiness should not be over-weighted.
- Every item in "matching" must exactly copy one of the reported symptom labels. Never invent evidence.
- Use "missingInformation" for the few details that would most improve the assessment.
- Blood-streaked stool is both a safety alert handled by the app and strong evidence for food-protein-sensitivity; include that contributor first when it is reported.
- Do not prescribe treatment, elimination diets, medication, or a protocol. The free Playbook supplies curated protocol steps.
- Do not generate emergency instructions; the app handles deterministic safety messaging.

Return ONLY this JSON shape:
{
  "summary": "one brief synthesis acknowledging when contributors may overlap",
  "causes": [
    {
      "playbookId": "one allowed id",
      "name": "the matching Playbook name",
      "description": "one or two plain sentences explaining why this contributor is plausible",
      "matching": ["exact reported symptom label"],
      "notFitting": ["limitations or non-specific evidence"],
      "missingInformation": ["a detail that would make this clearer"]
    }
  ],
  "followUpQuestions": ["zero to three short questions"],
  "note": "one sentence saying this organizes possibilities for exploration and is not a diagnosis"
}`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model response.");
  return JSON.parse(candidate.slice(start, end + 1));
}

function cleanList(value, limit = 3) {
  return Array.isArray(value) ? value.map(String).map((item) => item.trim()).filter(Boolean).slice(0, limit) : [];
}

function normalize(parsed, symptoms) {
  const reported = new Map(symptoms.map((label) => [label.toLowerCase(), label]));
  const seen = new Set();
  const causes = [];
  for (const candidate of Array.isArray(parsed?.causes) ? parsed.causes : []) {
    const playbookId = String(candidate?.playbookId || "");
    if (!ALLOWED_IDS.has(playbookId) || seen.has(playbookId)) continue;
    seen.add(playbookId);
    causes.push({
      playbookId,
      name: PLAYBOOK.find(([id]) => id === playbookId)[1],
      description: String(candidate?.description || "").trim(),
      matching: cleanList(candidate?.matching, 10).map((item) => reported.get(item.toLowerCase())).filter(Boolean),
      notFitting: cleanList(candidate?.notFitting),
      missingInformation: cleanList(candidate?.missingInformation),
    });
    if (causes.length === 3) break;
  }
  return {
    summary: String(parsed?.summary || "").trim(),
    causes,
    followUpQuestions: cleanList(parsed?.followUpQuestions),
    note: String(parsed?.note || "").trim(),
  };
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOW_ORIGIN || "*";
    const headers = { "Content-Type": "application/json", ...cors(origin) };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST") return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers });
    }

    const symptoms = Array.isArray(body.symptoms) ? body.symptoms.slice(0, 40).map(String).map((item) => item.slice(0, 120)) : [];
    if (symptoms.length === 0) return new Response(JSON.stringify({ error: "No symptoms provided" }), { status: 400, headers });

    const userMessage = [
      `Baby age: ${body.babyAgeMonths != null ? `${body.babyAgeMonths} month(s)` : "unknown"}`,
      `Feeding mode: ${String(body.feedingMode || "not provided").slice(0, 80)}`,
      `Fussiness timing: ${String(body.fussinessTiming || "not provided").slice(0, 160)}`,
      `Reported symptoms: ${symptoms.join(", ")}`,
      `Additional parent context: ${String(body.additionalContext || "not provided").slice(0, 2000)}`,
      "Return the assessment as specified.",
    ].join("\n");

    const modelResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.MODEL || "claude-sonnet-5",
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!modelResponse.ok) {
      const detail = await modelResponse.text().catch(() => "");
      return new Response(JSON.stringify({ error: "Model request failed", detail: detail.slice(0, 300) }), { status: 502, headers });
    }

    const data = await modelResponse.json();
    const text = (data.content || []).map((block) => block.text || "").join("");
    try {
      return new Response(JSON.stringify(normalize(extractJson(text), symptoms)), { headers });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Could not parse model output", detail: String(error) }), { status: 502, headers });
    }
  },
};
