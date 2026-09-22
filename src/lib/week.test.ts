import { describe, expect, it } from "vitest";
import { dayIndex, weekKey } from "./week";

describe("dayIndex", () => {
  it("maps Monday to 0 and Sunday to 6", () => {
    expect(dayIndex(new Date(2026, 8, 21))).toBe(0); // Mon 21 Sep 2026
    expect(dayIndex(new Date(2026, 8, 27))).toBe(6); // Sun 27 Sep 2026
  });
});

describe("weekKey", () => {
  it("returns the Monday of the week for every day in it", () => {
    for (let offset = 0; offset < 7; offset++) {
      expect(weekKey(new Date(2026, 8, 21 + offset))).toBe("2026-09-21");
    }
  });

  it("changes when crossing into the next week", () => {
    expect(weekKey(new Date(2026, 8, 28))).toBe("2026-09-28");
  });

  it("handles a Sunday that is the first of a month", () => {
    // Sun 1 Nov 2026 belongs to the week starting Mon 26 Oct 2026.
    expect(weekKey(new Date(2026, 10, 1))).toBe("2026-10-26");
  });

  it("handles a week that spans a year boundary", () => {
    // Fri 1 Jan 2027 belongs to the week starting Mon 28 Dec 2026.
    expect(weekKey(new Date(2027, 0, 1))).toBe("2026-12-28");
  });
});
