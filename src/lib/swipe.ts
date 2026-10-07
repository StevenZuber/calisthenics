/** Fraction of the sheet height a slow drag must cover before release closes it. */
const DISTANCE_FRACTION = 0.3;
/** Downward speed (px/ms) above which a short drag still counts as a flick. */
const FLICK_VELOCITY = 0.6;
/** A flick has to travel at least this far so a jittery tap never dismisses. */
const FLICK_MIN_OFFSET = 24;

export type SwipeRelease = {
  /** How far down the sheet was dragged at release, in px (never negative). */
  offset: number;
  /** Rendered height of the sheet, in px. */
  sheetHeight: number;
  /** Finger velocity at release in px/ms; positive is downward. */
  velocity: number;
};

/**
 * Decide whether releasing a swipe-down gesture should close the sheet or let
 * it spring back. Pure so the thresholds are unit-testable without a DOM.
 *
 * @param release - Drag offset, sheet height, and release velocity
 * @returns       `true` to dismiss, `false` to snap back open
 */
export function shouldDismiss({ offset, sheetHeight, velocity }: SwipeRelease): boolean {
  // Moving back up at release always means "keep it open", however far it went.
  if (velocity < 0) return false;
  if (offset >= sheetHeight * DISTANCE_FRACTION) return true;
  return velocity >= FLICK_VELOCITY && offset >= FLICK_MIN_OFFSET;
}
