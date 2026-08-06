/**
 * Cloudflare Worker for the model-driven contributor assessment.
 * The Worker owns the OpenAI API key and constrains model output to the Playbook.
 */

const PLAYBOOK = [
  ["food-protein-sensitivity", "Food Protein Sensitivity", "A cluster of stool, skin, feeding, and reflux-like signs. Blood-streaked stool is important supporting evidence and also requires clinician contact."],
  ["silent-reflux", "Reflux-Related Discomfort", "Discomfort during or after feeds, arching, wet burps, or difficulty settling flat while awake."],
  ["tongue-tie", "Oral Function / Possible Tongue Tie", "Clicking, leaking, feeding effort, latch pain, and ineffective milk transfer. Rank function, not appearance."],
  ["forceful-letdown", "Fast Flow / Oversupply", "Fast milk flow, gulping, pulling off, air intake, and foamy or green stools in breastfeeding context."],
  ["microbiome", "Microbiome Context", "Antibiotic, birth, and feeding history may be relevant, but evidence is evolving and symptoms are nonspecific."],
  ["digestive-immaturity", "Digestive Immaturity", "Common early digestive coordination, straining with soft stools, knees to chest, and evening discomfort."],
  ["sensory-overload", "Sensory Overload", "Busy days, difficulty settling, and evening fussiness that improve with lower stimulation."],
  ["structural-tension", "Body Asymmetry / Tension", "Persistent head preference, body asymmetry, or feeding-position difficulty that warrants conventional clinical assessment."],
];
const ALLOWED_IDS = new Set(PLAYBOOK.map(([id]) => id));
const playbookPrompt = PLAYBOOK.map(([id, name, description]) => `- ${id}: ${name}. ${description}`).join("\n");

const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    causes: {
      type: "array",
      minItems: 1,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          playbookId: { type: "string", enum: PLAYBOOK.map(([id]) => id) },
          name: { type: "string" },
          description: { type: "string" },
          matching: { type: "array", maxItems: 10, items: { type: "string" } },
          notFitting: { type: "array", maxItems: 3, items: { type: "string" } },
          missingInformation: { type: "array", maxItems: 3, items: { type: "string" } },
        },
        required: ["playbookId", "name", "description", "matching", "notFitting", "missingInformation"],
      },
    },
    followUpQuestions: { type: "array", maxItems: 3, items: { type: "string" } },
    note: { type: "string" },
  },
  required: ["summary", "causes", "followUpQuestions", "note"],
};

const SYSTEM_PROMPT = `You help a parent organize observations about a fussy young baby. Rank possible CONTRIBUTORS for education and structured investigation. Do not diagnose.

You may select only from this Playbook:
${playbookPrompt}

Rules:
- Return one strongest match and no more than two additional contributors. Multiple contributors can coexist.
- Use calm, direct language that a tired parent can scan.
- Explain both supporting evidence and limitations. Generic signs such as spit-up, gas, crying, green stool, or fussiness should not be over-weighted.
- Every item in "matching" must exactly copy one of the reported symptom labels. Never invent evidence.
- Use "missingInformation" for only the few details that would most improve the assessment.
- Blood-streaked stool is both a safety alert handled by the app and meaningful evidence for food-protein-sensitivity. Include that contributor first when it is reported, while acknowledging blood can have other causes.
- Use microbiome only when antibiotic, birth, or feeding history specifically supports it. Do not rank it first for gas or fussiness alone.
- Do not equate clicking, reflux, or fussiness alone with tongue tie. Oral restriction requires a functional feeding assessment.
- Do not prescribe treatment, elimination diets, medication, supplements, or a protocol. The curated Playbook supplies those steps.
- Do not generate emergency instructions. The app handles deterministic safety messaging.
- The note must say that this organizes possibilities for exploration and is not a diagnosis.`;

function allowedOrigin(request, env) {
  const configured = String(env.ALLOW_ORIGIN || "*").split(",").map((item) => item.trim()).filter(Boolean);
  if (configured.includes("*")) return "*";
  const requestOrigin = request.headers.get("Origin");
  if (!requestOrigin) return configured[0] || "*";
  return configured.includes(requestOrigin) ? requestOrigin : null;
}

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "null",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(payload, status, origin) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...cors(origin),
    },
  });
}

function cleanList(value, limit = 3) {
  return Array.isArray(value) ? value.map(String).map((item) => item.trim()).filter(Boolean).slice(0, limit) : [];
}

export function normalize(parsed, symptoms) {
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

async function requestAssessment(body, env) {
  const symptoms = Array.isArray(body.symptoms)
    ? body.symptoms.slice(0, 40).map(String).map((item) => item.trim().slice(0, 120)).filter(Boolean)
    : [];
  if (symptoms.length === 0) return { error: "No symptoms provided", status: 400 };

  const age = Number(body.babyAgeMonths);
  const userMessage = [
    `Baby age: ${Number.isFinite(age) && age >= 0 && age <= 24 ? `${age} month(s)` : "unknown"}`,
    `Feeding mode: ${String(body.feedingMode || "not provided").slice(0, 80)}`,
    `Fussiness timing: ${String(body.fussinessTiming || "not provided").slice(0, 160)}`,
    `Reported symptoms: ${symptoms.join(", ")}`,
    `Additional parent context: ${String(body.additionalContext || "not provided").slice(0, 2000)}`,
  ].join("\n");

  const modelResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: env.MODEL || "gpt-5.6-terra",
      instructions: SYSTEM_PROMPT,
      input: userMessage,
      max_output_tokens: 1600,
      reasoning: { effort: "low" },
      store: false,
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "fussy_baby_assessment",
          strict: true,
          schema: OUTPUT_SCHEMA,
        },
      },
    }),
  });

  if (!modelResponse.ok) return { error: "The assessment service is temporarily unavailable.", status: 502 };

  const data = await modelResponse.json();
  if (data.status === "incomplete") return { error: "The assessment response was incomplete. Please try again.", status: 502 };

  const content = (data.output || []).flatMap((item) => item.content || []);
  if (content.some((item) => item.type === "refusal")) {
    return { error: "The assessment could not be completed from those observations.", status: 422 };
  }
  const text = content.filter((item) => item.type === "output_text").map((item) => item.text || "").join("");
  try {
    const result = normalize(JSON.parse(text), symptoms);
    if (result.causes.length === 0) throw new Error("No supported contributors returned.");
    return { result, status: 200 };
  } catch {
    return { error: "The assessment response could not be validated. Please try again.", status: 502 };
  }
}

export default {
  async fetch(request, env) {
    const origin = allowedOrigin(request, env);
    if (!origin) return json({ error: "Origin not allowed" }, 403, null);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ status: "ok", model: env.MODEL || "gpt-5.6-terra" }, 200, origin);
    }
    if (request.method !== "POST" || url.pathname !== "/") return json({ error: "Not found" }, 404, origin);
    if (!env.OPENAI_API_KEY) return json({ error: "Assessment service is not configured" }, 503, origin);

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 16000) return json({ error: "Request is too large" }, 413, origin);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin);
    }

    try {
      const assessment = await requestAssessment(body, env);
      return assessment.result
        ? json(assessment.result, assessment.status, origin)
        : json({ error: assessment.error }, assessment.status, origin);
    } catch {
      return json({ error: "The assessment service is temporarily unavailable." }, 502, origin);
    }
  },
};
