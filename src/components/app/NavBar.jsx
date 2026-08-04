import React from "react";

const TABS = [
  { id: "home", label: "Home", icon: "M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-7.5Z" },
  { id: "navigator", label: "Navigator", icon: "M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm-6 8a6 6 0 0 0 12 0M12 18v2.5" },
  { id: "playbook", label: "Playbook", icon: "M12 6.5C10.5 5 8.5 4.5 5 4.5v13c3.5 0 5.5.5 7 2 1.5-1.5 3.5-2 7-2v-13c-3.5 0-5.5.5-7 2Zm0 0v13" },
  { id: "plan", label: "My Plan", icon: "M5 7.5h14M5 12h14M5 16.5h9M3 7.5h.01M3 12h.01M3 16.5h.01" },
];

/** Bottom navigation — four destinations, quiet ink on active. */
export function NavBar({ current, onNavigate }) {
  return (
    <nav
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--surface-card)",
        borderTop: "1px solid var(--border-default)",
        display: "flex",
        padding: "6px 8px calc(8px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              all: "unset",
              cursor: "pointer",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "6px 0",
              margin: "0 2px",
              borderRadius: "10px",
              background: active ? "var(--accent-signal-bg)" : "transparent",
              color: active ? "var(--text-brand)" : "var(--text-muted)",
              transition: "background .15s ease",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d={tab.icon} />
            </svg>
            <span style={{ fontSize: "10.5px", fontWeight: active ? 600 : 500 }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
