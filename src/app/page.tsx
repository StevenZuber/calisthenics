"use client";

import { useState } from "react";

type ExerciseInfo = {
  muscles: string;
  how: string;
  tips: string[];
};

type Exercise = {
  name: string;
  detail: string;
  note: string;
};

type Day = {
  label: string;
  title: string;
  color: string;
  textColor: string;
  exercises: Exercise[];
};

const exerciseInfo: Record<string, ExerciseInfo> = {
  "Push-ups": {
    muscles: "Chest, triceps, front deltoids, core",
    how: "Hands shoulder-width apart, body in a straight line from head to heels. Lower your chest to just above the floor, keeping elbows at roughly 45° from your torso. Press back up without locking out elbows at the top.",
    tips: [
      "Don't let your hips sag or pike up",
      "Squeeze your glutes and abs throughout",
      "Stop 2–3 reps before form breaks down",
      "Fist push-ups reduce wrist extension if needed",
    ],
  },
  "Chair Dips": {
    muscles: "Triceps, lower chest, front deltoids",
    how: "Hands on the edge of a sturdy chair or surface behind you, fingers forward. Feet flat on the floor, knees bent. Lower yourself by bending the elbows to ~90°, then press back up.",
    tips: [
      "Keep your back close to the chair",
      "Don't shrug your shoulders at the top",
      "Wider feet = easier; straighter legs = harder",
    ],
  },
  "Pike Push-ups": {
    muscles: "Shoulders (deltoids), triceps, upper chest",
    how: "Start in a downward-dog position — hips high, body forming an inverted V. Bend your elbows to lower the top of your head toward the floor, then press back up. The movement mimics an overhead press.",
    tips: [
      "The higher your hips, the more shoulder-dominant it becomes",
      "Keep your neck neutral — don't crane up",
      "This is a progression toward handstand push-ups",
    ],
  },
  "Bulgarian Split Squats": {
    muscles: "Quads, glutes, hamstrings, balance",
    how: "Rear foot elevated on a chair or couch behind you, front foot stepped out. Lower your back knee toward the floor, keeping your front shin mostly vertical. Drive up through the front heel.",
    tips: [
      "Front foot distance matters — experiment until shin stays vertical",
      "Hold something for balance until comfortable",
      "Go slow on the way down (3 seconds) for more benefit",
    ],
  },
  "Pull-ups": {
    muscles: "Lats, biceps, rear deltoids, rhomboids",
    how: "Hang from the bar with hands slightly wider than shoulder-width, palms facing away. Pull until your chin clears the bar, initiating the movement by drawing your shoulder blades down and together. Lower with control.",
    tips: [
      "Don't kip or swing — slow and controlled builds real strength",
      "Think 'elbows to hips' rather than 'chin to bar'",
      "Dead hang fully at the bottom for full range of motion",
    ],
  },
  "Negative Pull-ups": {
    muscles: "Lats, biceps, rear deltoids (eccentric focus)",
    how: "Jump or step up so your chin is above the bar, then lower yourself as slowly as possible — aim for 5 full seconds down. Step off and repeat. You're training the lowering phase, which builds strength fast.",
    tips: [
      "5 seconds down is the goal; 3 is fine to start",
      "Don't just drop — fight gravity the whole way",
      "Do these after your main pull-up sets when fresh strength is spent",
    ],
  },
  "Australian Rows": {
    muscles: "Upper back, biceps, rear deltoids, core",
    how: "Find a sturdy table. Lie underneath it, grip the edge with hands shoulder-width apart, and hang with straight arms. Your body should be in a straight line. Pull your chest up to the table, then lower back down.",
    tips: [
      "The more horizontal your body, the harder it is",
      "Keep your core tight — no sagging hips",
      "This is your horizontal pull to balance out push-ups",
    ],
  },
  "Hollow Body Hold": {
    muscles: "Deep core (transverse abdominis), hip flexors, shoulder stabilizers",
    how: "Lie on your back. Press your lower back firmly into the floor. Raise your legs to about 45° and your arms overhead and slightly off the floor. Hold the position — your body forms a shallow 'dish' or 'banana' shape.",
    tips: [
      "Lower back MUST stay in contact with the floor",
      "Bend your knees to make it easier; straighten to make it harder",
      "This is the foundation of almost all gymnastics strength work",
    ],
  },
  "Dead Bug": {
    muscles: "Deep core, anti-rotation stability",
    how: "Lie on your back, arms pointed straight up, knees bent at 90° lifted in the air. Slowly lower your right arm overhead and extend your left leg simultaneously — keeping your lower back flat on the floor. Return and switch sides.",
    tips: [
      "The lower back staying flat is the whole exercise",
      "Move slowly — control beats speed here",
      "Exhale as you extend; this helps brace your core",
    ],
  },
  "Plank": {
    muscles: "Full core, shoulders, glutes",
    how: "Forearms on the floor, elbows under shoulders. Body in a straight line from head to heels. Hold.",
    tips: [
      "Squeeze everything: abs, glutes, quads",
      "Don't let hips rise or sag",
      "Push your elbows into the floor slightly for more shoulder engagement",
    ],
  },
  "Stretching": {
    muscles: "Hip flexors, thoracic spine (upper back)",
    how: "Hip flexor: kneel on one knee, shift forward until you feel a stretch in the front of the rear hip. Hold 30–45 sec each side. Thoracic: sit cross-legged, place hands behind head, and gently extend your upper back over a rolled towel or foam roller.",
    tips: [
      "Breathe into the stretch — don't hold your breath",
      "This day is about recovery, not intensity",
      "Consistency here pays off in posture and injury prevention",
    ],
  },
  "Stairmaster or walk": {
    muscles: "Legs, cardiovascular system",
    how: "Easy effort only. If using the stairmaster, stay at a conversational pace. You should be able to hold a full sentence without gasping.",
    tips: [
      "This is active recovery, not a workout",
      "Skip it entirely if you're tired — rest is valid",
    ],
  },
  "Full rest": {
    muscles: "Everything",
    how: "Do nothing. Seriously. This is when your muscles actually grow and repair. Sleep, eat well, and let the week's work sink in.",
    tips: [
      "Sleep is the most underrated training tool",
      "Light walking is fine if you feel restless",
    ],
  },
};

const days: Day[] = [
  {
    label: "MON", title: "Push", color: "#e8ff6b", textColor: "#111",
    exercises: [
      { name: "Push-ups", detail: "4 × 10–12 reps", note: "Stop 2–3 short of failure" },
      { name: "Chair Dips", detail: "3 × 8–10 reps", note: "Furniture works fine" },
      { name: "Pike Push-ups", detail: "3 × 8 reps", note: "Shoulder emphasis" },
      { name: "Bulgarian Split Squats", detail: "2 × 10 each side", note: "Leg maintenance" },
    ],
  },
  {
    label: "TUE", title: "Pull", color: "#6bffd8", textColor: "#111",
    exercises: [
      { name: "Pull-ups", detail: "4 sets × max reps", note: "Good form only" },
      { name: "Negative Pull-ups", detail: "3 × 5-sec descent", note: "After working sets" },
      { name: "Australian Rows", detail: "3 × 12 reps", note: "Table / furniture rows" },
    ],
  },
  {
    label: "WED", title: "Core + Mobility", color: "#ff9f6b", textColor: "#111",
    exercises: [
      { name: "Hollow Body Hold", detail: "3 × 20–30 sec", note: "" },
      { name: "Dead Bug", detail: "3 × 10 each side", note: "" },
      { name: "Plank", detail: "3 × 45 sec", note: "" },
      { name: "Stretching", detail: "Hip flexors + thoracic spine", note: "Take your time" },
    ],
  },
  {
    label: "THU", title: "Push", color: "#e8ff6b", textColor: "#111",
    exercises: [
      { name: "Push-ups", detail: "4 × 10–12 reps", note: "Stop 2–3 short of failure" },
      { name: "Chair Dips", detail: "3 × 8–10 reps", note: "Furniture works fine" },
      { name: "Pike Push-ups", detail: "3 × 8 reps", note: "Shoulder emphasis" },
      { name: "Bulgarian Split Squats", detail: "2 × 10 each side", note: "Leg maintenance" },
    ],
  },
  {
    label: "FRI", title: "Pull", color: "#6bffd8", textColor: "#111",
    exercises: [
      { name: "Pull-ups", detail: "4 sets × max reps", note: "Good form only" },
      { name: "Negative Pull-ups", detail: "3 × 5-sec descent", note: "After working sets" },
      { name: "Australian Rows", detail: "3 × 12 reps", note: "Table / furniture rows" },
    ],
  },
  {
    label: "SAT", title: "Rest / Easy", color: "#c4c4c4", textColor: "#111",
    exercises: [
      { name: "Stairmaster or walk", detail: "Optional", note: "Keep it easy" },
      { name: "Stretching", detail: "Optional", note: "Recovery focus" },
    ],
  },
  {
    label: "SUN", title: "Rest", color: "#c4c4c4", textColor: "#111",
    exercises: [
      { name: "Full rest", detail: "You've earned it", note: "" },
    ],
  },
];

export default function Routine() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Exercise | null>(null);
  const day = days[active];
  const info = selected ? exerciseInfo[selected.name] : null;

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
          Calisthenics <span style={{ color: day.color }}>Routine</span>
        </div>
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", padding: "12px 20px 0", gap: 6 }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            background: active === i ? d.color : "#1e1e1e",
            color: active === i ? d.textColor : "#888",
            border: "none", borderRadius: 6, padding: "8px 0",
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
            transition: "all 0.15s ease", flex: 1, minWidth: 0,
          }}>
            {d.label}
          </button>
        ))}
      </div>

      {/* Day content */}
      <div style={{ padding: "20px", flex: 1 }}>
        <div style={{ fontSize: 13, letterSpacing: 3, color: day.color, marginBottom: 6, textTransform: "uppercase" }}>
          {day.label}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>{day.title}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {day.exercises.map((ex, i) => (
            <button key={i} onClick={() => setSelected(ex)} style={{
              background: "#1a1a1a", borderRadius: 10, padding: "14px 16px",
              border: "none", borderLeft: `3px solid ${day.color}`,
              cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              color: "#f5f5f5", width: "100%", transition: "background 0.15s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#222"}
              onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{ex.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 12, color: day.color, fontWeight: 600, whiteSpace: "nowrap", marginTop: 1 }}>{ex.detail}</div>
                  <div style={{ fontSize: 14, color: "#444" }}>›</div>
                </div>
              </div>
              {ex.note ? <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>{ex.note}</div> : null}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise detail drawer */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "flex-end", zIndex: 100,
            animation: "drawer-backdrop-in 220ms ease-out",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#1a1a1a", borderRadius: "16px 16px 0 0",
              padding: "24px 20px calc(36px + env(safe-area-inset-bottom))",
              width: "100%", maxHeight: "80dvh",
              overflowY: "auto", overscrollBehavior: "contain",
              boxSizing: "border-box",
              animation: "drawer-slide-up 260ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: "#333", borderRadius: 2, margin: "0 auto 20px" }} />

            {/* Exercise name + close */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontSize: 20, fontWeight: 700, flex: 1, paddingRight: 12 }}>{selected.name}</div>
              <button onClick={() => setSelected(null)} style={{
                background: "#2a2a2a", border: "none", color: "#888",
                width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
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
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 10 }}>TIPS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {info.tips.map((tip, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ color: day.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>—</div>
                        <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: "#666" }}>No additional info for this one.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
