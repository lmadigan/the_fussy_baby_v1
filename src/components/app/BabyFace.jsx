import React from "react";

/** A small swaddled-baby mark in the app palette — Home's bit of personality. */
export function BabyFace({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="32" cy="32" r="32" fill="var(--periwinkle-100)" />
      {/* swaddle */}
      <path d="M14 58 a18 18 0 0 1 36 0 Z" fill="var(--mint-200)" />
      <path d="M25 44 q7 6 14 0 l-2 8 q-5 3 -10 0 Z" fill="var(--surface-card)" opacity="0.55" />
      {/* face */}
      <circle cx="32" cy="28" r="14" fill="#F5E7DA" />
      {/* curl */}
      <path d="M32 13 q0.5 -4.5 5.5 -4.5" fill="none" stroke="var(--ink-800)" strokeWidth="1.8" strokeLinecap="round" />
      {/* closed, content eyes */}
      <path d="M24.5 27.5 q2 2.4 4.5 0" fill="none" stroke="var(--ink-800)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M35 27.5 q2 2.4 4.5 0" fill="none" stroke="var(--ink-800)" strokeWidth="1.8" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="23" cy="32" r="2.2" fill="var(--clay-200)" />
      <circle cx="41" cy="32" r="2.2" fill="var(--clay-200)" />
      {/* smile */}
      <path d="M30 34 q2 2 4 0" fill="none" stroke="var(--ink-800)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
