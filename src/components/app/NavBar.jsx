import React from "react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "navigator", label: "Navigator" },
  { id: "playbook", label: "Playbook" },
  { id: "plan", label: "My Plan" },
];

/** Text-first bottom navigation, with the design system's dot as active state. */
export function NavBar({ current, onNavigate }) {
  return (
    <nav
      aria-label="Primary"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--surface-card)",
        borderTop: "1px solid var(--border-default)",
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        padding: "6px 8px calc(8px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onNavigate(tab.id)}
            style={{
              border: 0,
              cursor: "pointer",
              minWidth: 0,
              minHeight: "52px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "4px",
              background: "transparent",
              color: active ? "var(--text-brand)" : "var(--text-muted)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "var(--radius-pill)",
                background: active ? "var(--accent-signal)" : "transparent",
              }}
            />
            <span style={{ fontSize: "11px", fontWeight: active ? 600 : 500, whiteSpace: "nowrap" }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
