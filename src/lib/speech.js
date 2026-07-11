/**
 * Voice capture — an input method only. The transcript is used to extract
 * observations for the parent to approve, then discarded. Recordings and
 * transcripts are never stored.
 */

export function speechSupported() {
  return typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function createRecognizer({ onResult, onEnd, onError }) {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = true;
  rec.continuous = true;
  rec.onresult = (event) => {
    let text = "";
    for (const result of event.results) text += result[0].transcript + " ";
    onResult(text.trim());
  };
  rec.onend = () => onEnd && onEnd();
  rec.onerror = (e) => onError && onError(e);
  return rec;
}
