import { describe, expect, it } from "vitest";
import { days, exerciseInfo } from "./plan";
import { stretchesFor, stretchInfo } from "./stretches";

describe("workout plan", () => {
  it("has seven days", () => {
    expect(days).toHaveLength(7);
  });

  it("has drawer info for every exercise", () => {
    for (const day of days) {
      for (const ex of day.exercises) {
        expect(exerciseInfo[ex.name], `${day.label}: ${ex.name}`).toBeDefined();
      }
    }
  });

  it("uses unique exercise names within each day", () => {
    for (const day of days) {
      const names = day.exercises.map(ex => ex.name);
      expect(new Set(names).size, day.label).toBe(names.length);
    }
  });
});

describe("stretch plan", () => {
  it("gives every day the two daily blocks plus a complement", () => {
    for (let i = 0; i < 7; i++) {
      const groups = stretchesFor(i);
      expect(groups).toHaveLength(3);
      expect(groups[0].title).toBe("Neck + Shoulders");
      expect(groups[1].title).toBe("Lower Back + Hips");
      expect(groups[2].items.length).toBeGreaterThan(0);
    }
  });

  it("has drawer info for every stretch", () => {
    for (let i = 0; i < 7; i++) {
      for (const group of stretchesFor(i)) {
        for (const item of group.items) {
          expect(stretchInfo[item.name], `day ${i}: ${item.name}`).toBeDefined();
        }
      }
    }
  });

  it("uses unique stretch names within each day", () => {
    for (let i = 0; i < 7; i++) {
      const names = stretchesFor(i).flatMap(g => g.items.map(item => item.name));
      expect(new Set(names).size, `day ${i}`).toBe(names.length);
    }
  });
});
