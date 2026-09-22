"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { days, exerciseInfo, type Exercise } from "@/data/plan";
import { useProgress } from "@/hooks/useProgress";
import { dayIndex } from "@/lib/week";

// Must match the `sheet-out` duration in globals.css: the drawer stays mounted
// this long after close is requested so the exit animation can play.
const CLOSE_MS = 200;

export default function Routine() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { doneCount, isDone, toggle } = useProgress();
  const day = days[active];
  const info = selected ? exerciseInfo[selected.name] : null;
  const selectedDone = selected ? isDone(active, selected.name) : false;

  // The page is static, so the server always renders Monday. Jump to today's
  // tab on the client, and again when the app returns to the foreground on a
  // different day (a home-screen PWA can stay open overnight).
  useEffect(() => {
    let lastDay = -1;
    function sync() {
      if (document.visibilityState !== "visible") return;
      const today = dayIndex(new Date());
      if (today !== lastDay) {
        lastDay = today;
        setActive(today);
      }
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  function openDrawer(ex: Exercise) {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setClosing(false);
    setSelected(ex);
  }

  const closeDrawer = useCallback(() => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setSelected(null);
      setClosing(false);
    }, CLOSE_MS);
  }, [closing]);

  useEffect(() => {
    if (!selected || closing) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closing, closeDrawer]);

  return (
    <div style={{
      fontFamily: "var(--font-dm-mono), 'Courier New', monospace",
      background: "#111",
      minHeight: "100dvh",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{
        padding: "calc(28px + env(safe-area-inset-top)) 20px 12px",
        borderBottom: "1px solid #2a2a2a",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#666", marginBottom: 4 }}>WEEKLY PLAN</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
          Calisthenics <span style={{ color: day.color, transition: "color 150ms ease" }}>Routine</span>
        </div>
      </div>

      {/* Day tabs */}
      <div role="tablist" style={{ display: "flex", padding: "12px 20px 0", gap: 6 }}>
        {days.map((d, i) => {
          const isActive = active === i;
          const names = d.exercises.map(ex => ex.name);
          const complete = names.length > 0 && doneCount(i, names) === names.length;
          return (
            <button
              key={d.label}
              role="tab"
              aria-selected={isActive}
              className="tab"
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                background: isActive ? d.color : "#1e1e1e",
                color: isActive ? d.textColor : "#888",
                border: "none", borderRadius: 6, padding: "9px 0",
                fontSize: 11, fontWeight: 700, letterSpacing: 1,
                cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
                flex: 1, minWidth: 0,
              }}
            >
              {d.label}
              {complete ? (
                <span aria-hidden style={{
                  position: "absolute", left: "50%", bottom: 3, marginLeft: -2,
                  width: 4, height: 4, borderRadius: 2,
                  background: isActive ? d.textColor : d.color,
                }} />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Day content */}
      <div style={{ padding: "20px", flex: 1 }}>
        <div style={{ fontSize: 13, letterSpacing: 3, color: day.color, marginBottom: 6, textTransform: "uppercase" }}>
          {day.label}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{day.title}</div>
          <DayTally done={doneCount(active, day.exercises.map(ex => ex.name))} total={day.exercises.length} color={day.color} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {day.exercises.map(ex => {
            const done = isDone(active, ex.name);
            return (
              <div key={ex.name} className="card" style={{
                display: "flex", alignItems: "stretch",
                background: "#1a1a1a", borderRadius: 10,
                borderLeft: `3px solid ${day.color}`,
              }}>
                <button
                  onClick={() => openDrawer(ex)}
                  style={{
                    flex: 1, minWidth: 0, padding: "14px 8px 14px 16px",
                    background: "transparent", border: "none",
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                    color: "#f5f5f5", opacity: done ? 0.55 : 1, transition: "opacity 150ms ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, textDecoration: done ? "line-through" : "none" }}>{ex.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 12, color: day.color, fontWeight: 600, whiteSpace: "nowrap", marginTop: 1 }}>{ex.detail}</div>
                      <div style={{ fontSize: 14, color: "#444" }}>›</div>
                    </div>
                  </div>
                  {ex.note ? <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>{ex.note}</div> : null}
                </button>
                <button
                  className="check"
                  aria-pressed={done}
                  aria-label={done ? `Unmark ${ex.name}` : `Mark ${ex.name} done`}
                  onClick={() => toggle(active, ex.name)}
                  style={{
                    width: 56, flexShrink: 0, background: "transparent", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 120ms ease",
                  }}
                >
                  <CheckCircle done={done} color={day.color} textColor={day.textColor} size={24} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercise detail drawer */}
      {selected && (
        <div
          className={closing ? "drawer-closing" : undefined}
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end" }}
        >
          <div
            className="backdrop"
            onClick={closeDrawer}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }}
          />
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            style={{
              position: "relative",
              background: "#1a1a1a", borderRadius: "16px 16px 0 0",
              padding: "24px 20px calc(24px + env(safe-area-inset-bottom))",
              width: "100%", maxHeight: "80dvh",
              overflowY: "auto", overscrollBehavior: "contain",
              boxSizing: "border-box",
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: "#333", borderRadius: 2, margin: "0 auto 20px" }} />

            {/* Exercise name + close */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div id="drawer-title" style={{ fontSize: 20, fontWeight: 700, flex: 1, paddingRight: 12 }}>{selected.name}</div>
              <button onClick={closeDrawer} aria-label="Close" style={{
                background: "#2a2a2a", border: "none", color: "#888",
                width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
                fontSize: 16, fontFamily: "inherit", flexShrink: 0,
              }}>×</button>
            </div>

            <div style={{ fontSize: 11, letterSpacing: 3, color: day.color, marginBottom: 20 }}>
              {selected.detail.toUpperCase()}
            </div>

            {info ? (
              <>
                {/* Muscles */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 8 }}>MUSCLES WORKED</div>
                  <div style={{ fontSize: 14, color: "#aaa", lineHeight: 1.5 }}>{info.muscles}</div>
                </div>

                {/* How to */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 8 }}>HOW TO DO IT</div>
                  <div style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7 }}>{info.how}</div>
                </div>

                {/* Tips */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 10 }}>TIPS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {info.tips.map(tip => (
                      <div key={tip} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ color: day.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>—</div>
                        <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>No additional info for this one.</div>
            )}

            <button
              className="tab"
              aria-pressed={selectedDone}
              onClick={() => toggle(active, selected.name)}
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 10, border: "none",
                background: selectedDone ? "#2a2a2a" : day.color,
                color: selectedDone ? day.color : day.textColor,
                fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 2,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              <CheckCircle done={selectedDone} color={day.color} textColor={day.textColor} size={18} />
              {selectedDone ? "DONE · TAP TO UNDO" : "MARK DONE"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DayTally({ done, total, color }: { done: number; total: number; color: string }) {
  const complete = total > 0 && done === total;
  return (
    <div style={{ fontSize: 11, letterSpacing: 2, color: complete ? color : done > 0 ? "#aaa" : "#555", whiteSpace: "nowrap" }}>
      {complete ? "ALL DONE" : `${done} / ${total}`}
    </div>
  );
}

function CheckCircle({ done, color, textColor, size }: { done: boolean; color: string; textColor: string; size: number }) {
  return (
    <span aria-hidden style={{
      width: size, height: size, borderRadius: "50%", boxSizing: "border-box",
      border: done ? "none" : "1.5px solid #444",
      background: done ? color : "transparent",
      color: textColor, fontSize: size * 0.6, fontWeight: 700, lineHeight: 1,
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      transition: "background-color 120ms ease, border-color 120ms ease",
    }}>
      {done ? "✓" : ""}
    </span>
  );
}
