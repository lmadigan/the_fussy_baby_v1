/**
 * The Fussy Baby — differential proxy (Cloudflare Worker).
 *
 * This is the only piece that holds your API key. The app POSTs a list of
 * plain-language symptoms; this worker asks Claude for a differential of
 * common, benign infant-fussiness causes and returns clean JSON.
 *
 * Deploy (one time):
 *   1. npm i -g wrangler && wrangler login
 *   2. wrangler secret put ANTHROPIC_API_KEY      (paste your key when asked)
 *   3. wrangler deploy
 *   4. Copy the deployed URL and paste it into the app via
 *      "Connect live model" on the home screen.
 *
 * Optional env vars: MODEL (defaults to claude-sonnet-5), ALLOW_ORIGIN
 * (defaults to "*"; set it to your site origin to lock the proxy down).
 */

const SYSTEM_PROMPT = `You are a calm, plainspoken assistant helping a parent of a young baby think through why their baby might be fussy. You produce a short differential of COMMON, BENIGN causes of infant fussiness for parent education.

Hard rules:
- You are NOT diagnosing. Frame everything as "possible causes to explore and discuss with a pediatrician."
- Use warm, everyday language a tired parent can read at 3am. No jargon without a plain gloss.
- Rank causes by how well they fit the symptoms given, most likely first. Return 2 to 4 causes.
- For each cause, be honest about what fits AND what doesn't. If a symptom is generic (e.g. spit-up, gas), say so rather than overclaiming.
- Never invent symptoms the parent didn't report. Only reference their reported symptoms in "matching".
- Do not mention emergencies or red flags here; the app handles those separately.

Respond with ONLY a JSON object, no prose, in exactly this shape:
{
  "causes": [
    {
      "name": "short cause name (parent-friendly, may include a common medical term in parentheses)",
      "description": "1-2 plain sentences on what it is",
      "matching": ["which of the parent's reported symptoms fit, phrased plainly"],
      "notFitting": ["honest caveats: which reported symptoms are non-specific or don't fit"],
      "whatToTry": ["1-3 gentle, concrete things a parent can observe or try at home"]
    }
  ],
  "note": "one short sentence reminding this is for exploration with their pediatrician, not a diagnosis"
}`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function extractJson(text) {
  // The model is asked for pure JSON, but strip stray fences / prose just in case.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model response.");
  return JSON.parse(candidate.slice(start, end + 1));
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOW_ORIGIN || "*";
    const headers = { "Content-Type": "application/json", ...cors(origin) };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST")
      return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers });
    }

    const symptoms = Array.isArray(body.symptoms) ? body.symptoms.slice(0, 40).map(String) : [];
    const age = body.babyAgeMonths;
    if (symptoms.length === 0)
      return new Response(JSON.stringify({ error: "No symptoms provided" }), { status: 400, headers });

    const userMsg =
      `Baby's age: ${age != null ? `${age} month(s)` : "unknown"}.\n` +
      `Reported symptoms: ${symptoms.join(", ")}.\n\n` +
      `Give the differential as specified.`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
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
        messages: [{ role: "user", content: userMsg }],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text().catch(() => "");
      return new Response(JSON.stringify({ error: "Model request failed", detail: detail.slice(0, 300) }), {
        status: 502,
        headers,
      });
    }

    const data = await anthropicRes.json();
    const text = (data.content || []).map((b) => b.text || "").join("");
    try {
      const parsed = extractJson(text);
      return new Response(JSON.stringify(parsed), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Could not parse model output", detail: String(e) }), {
        status: 502,
        headers,
      });
    }
  },
};
