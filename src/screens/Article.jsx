import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { getArticle } from "../data/articles.js";
import { getInvestigation } from "../data/playbook.js";

/** Article — static educational content from the Learn library. */
export function Article({ navigate, goBack, params }) {
  const article = getArticle(params.id);
  if (!article) {
    return (
      <Screen title="Article" onBack={goBack}>
        <Card>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>This article isn't available.</div>
        </Card>
      </Screen>
    );
  }
  return (
    <Screen eyebrow="Good Read" title={article.title} onBack={goBack}>
      <Card gap="12px">
        {article.body.map((para, i) => (
          <div key={i} style={{ fontSize: "var(--type-body-size)", lineHeight: 1.65, color: i === 0 ? "var(--text-primary)" : "var(--text-muted)", textWrap: "pretty" }}>
            {para}
          </div>
        ))}
      </Card>
      {article.relatedInvestigations?.length > 0 && (
        <Card>
          <SectionLabel>Related Causes</SectionLabel>
          {article.relatedInvestigations.map((id) => {
            const inv = getInvestigation(id);
            if (!inv) return null;
            return (
              <Button key={id} variant="secondary" onClick={() => navigate("investigation", { id })}>
                {inv.title}
              </Button>
            );
          })}
        </Card>
      )}
      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center", textWrap: "pretty", padding: "0 8px" }}>
        Educational content only — not medical advice.
      </div>
    </Screen>
  );
}
