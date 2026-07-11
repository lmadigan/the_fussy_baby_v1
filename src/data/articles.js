/**
 * Learn — curated educational articles. Static content, no personalization.
 */

export const ARTICLES = [
  {
    id: "what-does-green-stool-mean",
    title: "What does green stool mean?",
    teaser: "Usually nothing alarming — but the context around it is worth observing.",
    body: [
      "Green stool is one of the most searched — and least alarming — things a new parent will see. Baby stool naturally ranges from mustard yellow to green to brown, and an occasional green diaper on its own usually means nothing.",
      "Consistently green stool is more interesting as an observation. It can happen when a baby gets proportionally more foremilk (the thinner milk at the start of a feed), which is common with a forceful letdown or oversupply. It can also accompany a food protein sensitivity, especially when it appears together with mucus or unusual fussiness.",
      "What to observe: how often stools are green, whether mucus or blood streaks appear, and what else is happening — gulpy feeds, gas, fussiness after feeds. A pattern across observations is far more useful to your pediatrician than any single diaper.",
      "Call your pediatrician promptly about blood in stool, black stool after the newborn period, or white/clay-colored stool.",
    ],
    relatedInvestigations: ["forceful-letdown", "food-protein-sensitivity"],
  },
  {
    id: "tongue-ties-explained",
    title: "Tongue ties explained",
    teaser: "What an oral restriction is, what it isn't, and what to observe before an assessment.",
    body: [
      "Everyone has a band of tissue (a frenulum) under the tongue. A tongue tie is when that band is tight or short enough to restrict the tongue's movement — which matters for feeding, because an effective latch depends on the tongue moving freely.",
      "When the tongue can't cup and seal well, babies compensate: the latch gets shallow, the seal leaks (clicking sounds, milk dribbling), and extra air comes in with the milk. That air becomes gas, spit up, and post-feed fussiness. Feeds may be unusually short, unusually long, or unusually frequent.",
      "Not every clicking feed is a tie, and not every tie needs treatment. The useful parent move is observation: several days of notes about feed sounds, feed lengths, leaking, and comfort give a lactation consultant or pediatric provider something real to assess.",
      "If a restriction is confirmed, options range from positioning changes to a simple release procedure. That decision belongs with your provider — your observations just make it better informed.",
    ],
    relatedInvestigations: ["tongue-tie", "feeding-mechanics"],
  },
  {
    id: "forceful-letdown-explained",
    title: "Forceful letdown",
    teaser: "When milk arrives faster than baby can swallow, feeds get loud and gassy.",
    body: [
      "A letdown is the reflex that releases milk once a baby starts nursing. For some parents it arrives fast — fast enough that baby has to gulp to keep up, swallowing air with every mouthful.",
      "The signature is at the start of the feed: coughing, sputtering, clicking, or pulling off within the first couple of minutes, sometimes followed by fussiness at the breast. Downstream you may see gas, spit up, and greenish stools.",
      "Simple mechanics help: laid-back positions let gravity slow the flow, and briefly unlatching during the initial letdown lets the fastest milk pass. A lactation consultant can help with block feeding if oversupply is part of the picture.",
      "This is a very manageable pattern once identified — and identifying it is mostly a matter of watching the first two minutes of feeds for a few days.",
    ],
    relatedInvestigations: ["forceful-letdown", "feeding-mechanics"],
  },
  {
    id: "silent-reflux-explained",
    title: "Silent reflux",
    teaser: "Reflux without the spit up — discomfort that's easy to miss and easy to over-suspect.",
    body: [
      "All babies reflux; the muscle that keeps milk down is still maturing. When milk comes up and gets swallowed again instead of spit out, it's called silent reflux — the discomfort happens without the visible mess.",
      "It tends to look like: arching or crying during and after feeds, wet swallowing or gagging sounds, congestion without a cold, discomfort lying flat, and better settling when upright.",
      "Because these signs overlap with feeding mechanics, food sensitivities, and ordinary newborn behavior, silent reflux is both under- and over-diagnosed. That's why observation over days matters more than any single episode: timing relative to feeds, position preferences, and sounds between feeds build a picture.",
      "Most reflux improves steadily with age. Persistent feeding refusal, poor weight gain, or significant distress are reasons to see your pediatrician — with your observation history in hand.",
    ],
    relatedInvestigations: ["silent-reflux", "feeding-mechanics"],
  },
  {
    id: "paced-bottle-feeding",
    title: "Paced bottle feeding",
    teaser: "A slower, baby-led way to bottle feed that cuts down on air and overfeeding.",
    body: [
      "Traditional bottle feeding lets gravity pour milk steadily — faster than milk flows at the breast, and often faster than a young baby can comfortably manage. Paced feeding hands control back to the baby.",
      "The method: hold baby fairly upright, keep the bottle close to horizontal, let baby draw the nipple in, and pause every ounce or so (or when baby's cues say so). Feeds take a little longer and involve much less gulping.",
      "Benefits show up in the observations parents log: less air swallowed means fewer painful burps and less spit up, and the slower pace makes it easier for baby to stop when full.",
      "If feeds still sound gulpy with pacing, a slower-flow nipple is the next simple experiment.",
    ],
    relatedInvestigations: ["feeding-mechanics"],
  },
  {
    id: "the-witching-hour",
    title: "The witching hour",
    teaser: "Why evenings are hard for so many babies — and what the day can tell you about it.",
    body: [
      "Somewhere between late afternoon and bedtime, many otherwise content babies dissolve into fussiness that resists the usual fixes. It's common enough to have a name: the witching hour.",
      "Several ordinary things converge in the evening: gas accumulated over the day, tiredness from short or skipped naps, overstimulation, and a natural dip in milk supply for some parents. None of them alone would cause tears; together they often do.",
      "The investigative move is to look upstream. Compare fussy evenings against the day that preceded them — nap lengths, stimulation, feed quality. Many parents find their baby's evening mood is written by 2pm.",
      "Evening fussiness that comes with fever, feeding refusal, or inconsolable crying for hours is a pediatrician call, not a pattern to wait out.",
    ],
    relatedInvestigations: ["overtiredness", "gas-digestion"],
  },
];

const byId = new Map(ARTICLES.map((a) => [a.id, a]));

export function getArticle(id) {
  return byId.get(id);
}
