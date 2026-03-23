import { useState, useEffect } from "react";

const lines = [
  { prompt: true, text: "claude --help build ai-chat-platform" },
  { prompt: false, text: "Analyzing requirements..." },
  { prompt: false, text: "Scaffolding Next.js + TypeScript project..." },
  { prompt: false, text: "Setting up streaming API routes..." },
  { prompt: false, text: "Configuring multi-model support..." },
  { prompt: false, text: '  "anthropic", "openai", "local"' },
  { prompt: false, text: "Building real-time chat UI..." },
  { prompt: false, text: "Adding conversation persistence..." },
  { prompt: false, text: "" },
  { prompt: false, text: "Done in 4.2s. Ready to deploy.", color: "green" },
  { prompt: true, text: "git push origin main" },
  { prompt: false, text: "Deployed to production.", color: "green" },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const delay = lines[visibleLines]?.prompt ? 800 : 200;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    }

    // Loop: restart after pause
    const restart = setTimeout(() => setVisibleLines(0), 4000);
    return () => clearTimeout(restart);
  }, [visibleLines]);

  return (
    <div
      role="img"
      aria-label="Animated terminal demo showing AI-augmented development workflow: scaffolding a project, configuring multi-model support, and deploying to production"
      className="w-full max-w-2xl rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-2xl"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]" aria-hidden="true">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-xs text-[var(--color-text-muted)] ml-2 font-mono">
          terminal &mdash; zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm leading-relaxed h-72 overflow-hidden" aria-hidden="true">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={`${i}-${visibleLines}`}
            className="animate-fade-in"
            style={{ animationDuration: "0.3s" }}
          >
            {line.prompt ? (
              <span>
                <span className="text-[var(--color-accent)]">~</span>
                <span className="text-[var(--color-text-muted)]"> $ </span>
                <span className="text-[var(--color-text-primary)]">{line.text}</span>
              </span>
            ) : line.text === "" ? (
              <br />
            ) : (
              <span
                className={
                  line.color === "green"
                    ? "text-[#22c55e]"
                    : "text-[var(--color-text-secondary)]"
                }
              >
                {line.text}
              </span>
            )}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-[var(--color-accent)] animate-pulse" />
        )}
      </div>
    </div>
  );
}
