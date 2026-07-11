const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Local date key, e.g. "2026-07-11". */
export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "Friday, July 11" */
export function formatLong(dateOrKey) {
  const d = typeof dateOrKey === "string" ? parseKey(dateOrKey) : dateOrKey;
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

/** "July 11" */
export function formatShort(key) {
  const d = parseKey(key);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

/** "Today", "Yesterday", or "July 8" */
export function formatRelative(key) {
  const today = todayKey();
  if (key === today) return "Today";
  const y = new Date();
  y.setDate(y.getDate() - 1);
  if (key === todayKey(y)) return "Yesterday";
  return formatShort(key);
}
