# Contributor assessment service

The Navigator calls this Cloudflare Worker rather than a model from the browser.
The OpenAI key remains a Worker secret, and GPT can return only the eight
curated Playbook contributors. Safety alerts remain deterministic in the app.

## Deploy the Worker

```bash
npx wrangler login
cd server
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

Set `ALLOW_ORIGIN` in `wrangler.toml` to the exact production site origin before
launch. Multiple origins can be comma-separated. The Worker exposes `GET /health`
for a configuration check and accepts assessments at `POST /`.

## Connect the app build

Set the public Worker URL before building the frontend:

```bash
VITE_DIFFERENTIAL_ENDPOINT=https://fussy-baby-differential.example.workers.dev/ npm run build
```

For local development, create an uncommitted `.env.local` from `.env.example`.
Never put `OPENAI_API_KEY` in a `VITE_` variable because Vite exposes those
values to the browser.

## Model contract

- OpenAI uses a JSON schema structured output and can select only curated IDs.
- The Worker validates exact symptom evidence and drops unsupported contributors.
- Blood-streaked stool is deterministically mapped to food protein sensitivity in
  the client while still showing the clinician-contact alert.
- GPT does not write protocols, prescribe treatment, or decide safety alerts.
- Responses use `Cache-Control: no-store`; configure Cloudflare rate limiting
  before a public launch.
