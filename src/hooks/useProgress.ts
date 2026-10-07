import { useCallback, useEffect, useRef, useState } from "react";
import type { Mode } from "@/data/plan";
import { weekKey } from "@/lib/week";

const STORAGE_KEY = "calisthenics.progress.v1";

type Stored = {
  week: string;
  done: string[];
};

// Routine keys keep the original unprefixed shape so progress stored before
// the Stretch tab existed still counts for the rest of that week.
function progressKey(mode: Mode, dayIndex: number, exerciseName: string): string {
  const base = `${dayIndex}:${exerciseName}`;
  return mode === "routine" ? base : `s:${base}`;
}

function load(currentWeek: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as Partial<Stored>;
    // A stale week means a new training week has started: start clean.
    if (parsed.week !== currentWeek || !Array.isArray(parsed.done)) return new Set();
    return new Set(parsed.done.filter((k): k is string => typeof k === "string"));
  } catch {
    return new Set();
  }
}

function save(currentWeek: string, done: Set<string>) {
  try {
    const payload: Stored = { week: currentWeek, done: [...done] };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable (private mode, quota). Progress just won't persist.
  }
}

/**
 * Per-exercise "done" state for the current Monday-to-Sunday week, persisted in
 * localStorage and reset automatically when a new week starts. Starts empty on
 * the server and during hydration, then loads from storage on mount.
 *
 * @returns `isDone(mode, dayIndex, name)` / `toggle(mode, dayIndex, name)`
 *          plus `doneCount(mode, dayIndex, names)` for day-level summaries
 */
export function useProgress() {
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const [week, setWeek] = useState<string | null>(null);
  const loadedWeek = useRef<string | null>(null);

  // Load on mount, and re-check the week whenever the app comes back to the
  // foreground: as a home-screen PWA it can stay open across a Sunday night.
  useEffect(() => {
    function sync() {
      const current = weekKey(new Date());
      if (loadedWeek.current === current) return;
      loadedWeek.current = current;
      setWeek(current);
      setDone(load(current));
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (week) save(week, done);
  }, [done, week]);

  const isDone = useCallback(
    (mode: Mode, dayIndex: number, name: string) => done.has(progressKey(mode, dayIndex, name)),
    [done],
  );

  const toggle = useCallback(
    (mode: Mode, dayIndex: number, name: string) => {
      const key = progressKey(mode, dayIndex, name);
      setDone(prev => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    },
    [],
  );

  const doneCount = useCallback(
    (mode: Mode, dayIndex: number, names: string[]) =>
      names.reduce((n, name) => n + (done.has(progressKey(mode, dayIndex, name)) ? 1 : 0), 0),
    [done],
  );

  return { doneCount, isDone, toggle };
}
