import React from "react";
import { Tag } from "../core/Tag.jsx";
import { CATEGORIES, observationsInCategory } from "../../data/vocabulary.js";

/**
 * The full observation vocabulary as grouped, tappable chips.
 * Recognition over recall: new parents often don't know that clicking
 * feeds or green diapers "count," so we show everything and let them
 * point at what they've seen.
 */
export function SymptomPicker({ selected, onToggle }) {
  return (
    <>
      {CATEGORIES.map((cat) => (
        <div key={cat} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>{cat}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {observationsInCategory(cat).map((obs) => (
              <Tag key={obs.id} tone="neutral" selected={selected.includes(obs.id)} onClick={() => onToggle(obs.id)}>
                {obs.label}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
