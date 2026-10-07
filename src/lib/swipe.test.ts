import { describe, expect, it } from "vitest";
import { shouldDismiss } from "./swipe";

const HEIGHT = 600;

describe("shouldDismiss", () => {
  it("dismisses when dragged past the distance threshold, even when released slowly", () => {
    expect(shouldDismiss({ offset: 200, sheetHeight: HEIGHT, velocity: 0 })).toBe(true);
  });

  it("springs back on a short, slow drag", () => {
    expect(shouldDismiss({ offset: 60, sheetHeight: HEIGHT, velocity: 0.1 })).toBe(false);
  });

  it("dismisses on a fast downward flick even if the drag was short", () => {
    expect(shouldDismiss({ offset: 60, sheetHeight: HEIGHT, velocity: 1.2 })).toBe(true);
  });

  it("ignores a flick that barely moved, so a tap cannot dismiss", () => {
    expect(shouldDismiss({ offset: 10, sheetHeight: HEIGHT, velocity: 2 })).toBe(false);
  });

  it("springs back when the finger is moving back up at release", () => {
    expect(shouldDismiss({ offset: 200, sheetHeight: HEIGHT, velocity: -1 })).toBe(false);
  });
});
