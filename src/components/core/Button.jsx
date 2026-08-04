import React from "react";

/** Primary action: filled deep navy pill. Secondary: pill outline on inset gray. */
export function Button({ variant = "primary", size = "md", children, style, disabled = false, ...rest }) {
  const base = {
    boxSizing: "border-box",
    cursor: disabled ? "default" : "pointer",
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
      minHeight: "var(--hit-min)",
    },
    secondary: {
      background: "var(--surface-inset)",
      color: "var(--text-brand)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      fontSize: "var(--type-button-sm-size)",
      padding: "9px 14px",
      alignSelf: "flex-start",
      minHeight: "var(--hit-min)",
    },
  };
  const hover = variant === "primary"
    ? (e) => { if (!disabled) e.currentTarget.style.background = "var(--action-primary-hover)"; }
    : (e) => { if (!disabled) e.currentTarget.style.borderColor = "var(--border-hover)"; };
  const unhover = variant === "primary"
    ? (e) => (e.currentTarget.style.background = "var(--action-primary)")
    : (e) => (e.currentTarget.style.borderColor = "var(--border-default)");
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
