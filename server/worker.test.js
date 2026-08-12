import test from "node:test";
import assert from "node:assert/strict";
import worker, { normalize } from "./worker.js";

test("normalize keeps only supported contributors and exact reported evidence", () => {
  const result = normalize({
    summary: "Two possibilities fit.",
    causes: [
      {
        playbookId: "food-protein-sensitivity",
        description: "The stool and skin cluster fits.",
        matching: ["Eczema flare", "Invented symptom"],
        notFitting: ["Spit-up is nonspecific"],
        missingInformation: ["Growth history"],
      },
      {
        playbookId: "unsupported-diagnosis",
        description: "Should be removed.",
        matching: ["Eczema flare"],
      },
    ],
    followUpQuestions: ["When did this begin?"],
    note: "Not a diagnosis.",
  }, ["Eczema flare"]);

  assert.equal(result.causes.length, 1);
  assert.equal(result.causes[0].name, "Food Protein Sensitivity");
  assert.deepEqual(result.causes[0].matching, ["Eczema flare"]);
});

test("health endpoint does not require a model key", async () => {
  const response = await worker.fetch(new Request("https://worker.test/health"), { MODEL: "gpt-5.6-terra" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", model: "gpt-5.6-terra" });
});

test("assessment request uses schema-constrained model output", async () => {
  const originalFetch = globalThis.fetch;
  let modelPayload;
  let modelUrl;
  let authorization;
  globalThis.fetch = async (url, options) => {
    modelUrl = url;
    authorization = options.headers.Authorization;
    modelPayload = JSON.parse(options.body);
    return new Response(JSON.stringify({
      status: "completed",
      output: [{
        type: "message",
        content: [{
          type: "output_text",
          text: JSON.stringify({
            summary: "The stool and skin cluster is the strongest match.",
            causes: [{
              playbookId: "food-protein-sensitivity",
              name: "Food Protein Sensitivity",
              description: "These observations fit the cluster.",
              matching: ["Blood-streaked stool", "Eczema flare"],
              notFitting: [],
              missingInformation: ["Growth history"],
            }],
            followUpQuestions: ["How has feeding changed?"],
            note: "This organizes possibilities for exploration and is not a diagnosis.",
          }),
        }],
      }],
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  try {
    const response = await worker.fetch(new Request("https://worker.test/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://app.test" },
      body: JSON.stringify({ symptoms: ["Blood-streaked stool", "Eczema flare"] }),
    }), { OPENAI_API_KEY: "test-key", MODEL: "gpt-5.6-terra", ALLOW_ORIGIN: "https://app.test" });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://app.test");
    assert.equal(modelUrl, "https://api.openai.com/v1/responses");
    assert.equal(authorization, "Bearer test-key");
    assert.equal(modelPayload.text.format.type, "json_schema");
    assert.equal(modelPayload.model, "gpt-5.6-terra");
    assert.equal(modelPayload.store, false);
    assert.deepEqual((await response.json()).causes[0].matching, ["Blood-streaked stool", "Eczema flare"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
