import React from "react";

/** Labeled text input. */
export function Input({ label, multiline = false, style, ...rest }) {
  const field = {
    boxSizing: "border-box",
    width: "100%",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--type-body-size)",
    color: "var(--text-primary)",
    background: "var(--surface-inset)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-button)",
    padding: "12px 14px",
    outline: "none",
    resize: "vertical",
    minHeight: multiline ? "88px" : "var(--hit-min)",
    lineHeight: "var(--type-body-line)",
    ...style,
  };
  const focus = (e) => (e.currentTarget.style.borderColor = "var(--border-hover)");
  const blur = (e) => (e.currentTarget.style.borderColor = "var(--border-default)");
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <span
          style={{
            fontSize: "var(--type-label-size)",
            fontWeight: "var(--type-label-weight)",
            letterSpacing: "var(--type-label-tracking)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
      )}
      {multiline ? (
        <textarea style={field} onFocus={focus} onBlur={blur} {...rest} />
      ) : (
        <input style={field} onFocus={focus} onBlur={blur} {...rest} />
      )}
    </label>
  );
}
