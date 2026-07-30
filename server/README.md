# Differential proxy

The app asks a language model for possible causes of your baby's fussiness.
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

Open the app, and on the home screen tap **“Connect live model →”** (shown on
the possible-causes section). Paste the worker URL. It's stored in your browser
only. From then on, your symptoms get a live read; edit them and the causes
update.

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
