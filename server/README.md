# Contributor assessment proxy

The app asks a language model to rank possible contributors to your baby's fussiness.
The model call can't happen safely from the browser (it needs an API key), so
this tiny worker sits in between: the app sends it symptoms, it asks Claude,
and it returns clean JSON. **This worker is the only place your API key lives.**

## Deploy once

```bash
npm install -g wrangler
wrangler login
cd server
wrangler secret put ANTHROPIC_API_KEY   # paste your Anthropic API key
wrangler deploy
```

`wrangler deploy` prints a URL like
`https://fussy-baby-differential.<you>.workers.dev`.

## Connect the app

Open the Symptom Navigator, run an assessment in example mode, and tap
**Connect live model**. Paste the worker URL. It is stored in your browser only.

## Options

- `MODEL` (in `wrangler.toml`) — which Claude model to use. Defaults to
  `claude-sonnet-5`.
- `ALLOW_ORIGIN` — set to your site origin (e.g. `https://lmadigan.github.io`)
  to stop other sites from using your proxy. Defaults to `*` for easy setup.

## What it does not do

- It does **not** diagnose — the prompt frames everything as possible causes to
  discuss with a pediatrician.
- It does **not** handle red flags. Those are matched in the app itself,
  deterministically, so the “call your pediatrician” nudge never depends on a
  model response.
- It does **not** write protocol content. The model can select only from the
  eight published causes; trusted app code maps each cause to the free Playbook.
