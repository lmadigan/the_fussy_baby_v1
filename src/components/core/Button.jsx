import React from "react";

/** Primary action: filled quiet ink, 10px radius. Secondary: pill outline on inset gray. */
export function Button({ variant = "primary", size = "md", children, style, ...rest }) {
  const base = {
    boxSizing: "border-box",
    cursor: "pointer",
    border: "none",
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--type-button-weight)",
    textAlign: "center",
    transition: "background .15s ease, border-color .15s ease",
  };
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--text-on-brand)",
      borderRadius: "var(--radius-button)",
      fontSize: "var(--type-button-size)",
      padding: size === "sm" ? "9px 14px" : "13px 16px",
      width: size === "sm" ? undefined : "100%",
    },
    secondary: {
      background: "var(--surface-inset)",
      color: "var(--text-brand)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      fontSize: "var(--type-button-sm-size)",
      padding: "9px 14px",
      alignSelf: "flex-start",
    },
  };
  const hover = variant === "primary"
    ? (e) => (e.currentTarget.style.background = "var(--action-primary-hover)")
    : (e) => (e.currentTarget.style.borderColor = "var(--border-hover)");
  const unhover = variant === "primary"
    ? (e) => (e.currentTarget.style.background = "var(--action-primary)")
    : (e) => (e.currentTarget.style.borderColor = "var(--border-default)");
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      {...rest}
    >
      {children}
    </button>
  );
}
