# The Fussy Baby Design System

## Direction

The approved visual direction is **Quiet Gentle Intelligence: Navy Petal**.

The product should feel smart, calm, trustworthy, soft, and gently feminine. It should resemble a thoughtful pediatric guide more than a conventional health dashboard.

## Foundations

- **Primary:** deep navy `--navy-800` for the wordmark, primary actions, and selected controls.
- **Signal:** rose `--accent-signal` and `--accent-signal-bg` for information that deserves attention.
- **Calm:** mint `--accent-calm` and `--accent-calm-bg` for progress, saved state, and reassurance.
- **Surfaces:** cool-white app background, white cards, and cool-gray borders.
- **Display type:** Prata, weight 400, for the wordmark, screen titles, and card titles.
- **UI type:** Instrument Sans for labels, body copy, controls, and metadata.
- **Cards:** 18px radius, 20px padding, one subtle navy shadow, and no nesting.
- **Controls:** pill buttons and chips; 12px radius fields; minimum 44px interactive targets.

All implementation colors, type, spacing, radii, and shadows must use CSS custom properties from `src/tokens/`.

## Signal Language

Small dots and tint pills carry state:

- Rose means pay attention or active evidence.
- Mint means active, saved, or calmly in progress.
- Gray means neutral, missing, or not yet established.

Do not use rose or mint as large page or card backgrounds. Navy is the only heavy color.

## Interface Rules

- Use a flat stack of cards on the cool-white app surface.
- Start cards with an uppercase eyebrow label.
- Use Prata card titles at weight 400 rather than bold UI type.
- Keep navigation text-first. The active destination uses a small rose dot.
- Use native, accessible controls for checklists and form inputs.
- Do not add gradients, decorative illustrations, emoji, invented logos, or ornamental icons.
- Keep motion limited to short color and border transitions.
- Never display numeric AI confidence scores or diagnosis language.

## Voice

The app is a collaborator, not an authority. Use calm, direct language and honest uncertainty.

- Use `we` for the app and `you` for the parent.
- Describe possibilities and mechanisms, not diagnoses.
- Use phrases such as `strongest match`, `may contribute`, and `what would make this clearer`.
- Avoid cheerleading, exclamation points, percentages, and alarmist language.

## Core Components

- `Card`: the only framed content container.
- `CardTitle`: Prata title treatment inside cards.
- `SectionLabel`: uppercase card eyebrow with optional right-side metadata.
- `StatusBadge`: rose, mint, or neutral state pill with a small dot.
- `Tag`: observation chip or selectable pill.
- `Button`: navy primary pill or quiet secondary pill.
- `Input`: 12px-radius text and multiline fields.
- `InsightRow`: signal dot paired with evidence or uncertainty language.
