import { useEffect, type RefObject } from "react";
import { shouldDismiss } from "@/lib/swipe";

/** Finger travel before a touch is treated as a drag rather than a tap. */
const DRAG_START_PX = 8;
const SNAP_BACK_MS = 220;

type Options = {
  sheetRef: RefObject<HTMLElement | null>;
  backdropRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  onDismiss: () => void;
};

/**
 * Swipe-down-to-close for the bottom sheet. Listens for touch events on the
 * sheet (non-passive, so a drag can suppress native scrolling) and moves it
 * with the finger, fading the backdrop in step. Only arms when the sheet is
 * scrolled to the top and the finger moves down; everything else stays native
 * scroll. On release, `shouldDismiss` picks between closing and springing back.
 *
 * Positions are written straight to the DOM instead of React state so a 60fps
 * drag doesn't re-render the drawer. Once a drag starts, the sheet gets the
 * `sheet-dragged` class, which turns off the entrance keyframe so inline
 * transforms take effect (CSS animations outrank inline styles).
 */
export function useSwipeToDismiss({ sheetRef, backdropRef, enabled, onDismiss }: Options) {
  useEffect(() => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    if (!enabled || !sheet || !backdrop) return;

    let armed = false;
    let dragging = false;
    let startY = 0;
    let lastY = 0;
    let lastT = 0;
    let prevY = 0;
    let prevT = 0;

    function setOffset(offset: number) {
      if (!sheet || !backdrop) return;
      sheet.style.transform = `translateY(${offset}px)`;
      backdrop.style.opacity = String(Math.max(0, 1 - offset / sheet.offsetHeight));
    }

    function snapBack() {
      if (!sheet || !backdrop) return;
      sheet.style.transition = `transform ${SNAP_BACK_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`;
      backdrop.style.transition = `opacity ${SNAP_BACK_MS}ms ease-out`;
      setOffset(0);
    }

    function onStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      armed = sheet!.scrollTop <= 0;
      dragging = false;
      startY = lastY = prevY = e.touches[0].clientY;
      lastT = prevT = e.timeStamp;
    }

    function onMove(e: TouchEvent) {
      if (!armed || e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = y - startY;

      if (!dragging) {
        // Finger went up, or the content scrolled: this is a scroll, not a swipe.
        if (dy < 0 || sheet!.scrollTop > 0) {
          armed = false;
          return;
        }
        if (dy < DRAG_START_PX) return;
        dragging = true;
        sheet!.classList.add("sheet-dragged");
        sheet!.style.transition = "none";
        backdrop!.style.transition = "none";
      }

      e.preventDefault();
      prevY = lastY;
      prevT = lastT;
      lastY = y;
      lastT = e.timeStamp;
      setOffset(Math.max(0, dy));
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      armed = false;
      const dt = lastT - prevT;
      const velocity = dt > 0 ? (lastY - prevY) / dt : 0;
      const offset = Math.max(0, lastY - startY);
      if (shouldDismiss({ offset, sheetHeight: sheet!.offsetHeight, velocity })) {
        onDismiss();
      } else {
        snapBack();
      }
    }

    function onCancel() {
      if (!dragging) return;
      dragging = false;
      armed = false;
      snapBack();
    }

    sheet.addEventListener("touchstart", onStart, { passive: true });
    sheet.addEventListener("touchmove", onMove, { passive: false });
    sheet.addEventListener("touchend", onEnd);
    sheet.addEventListener("touchcancel", onCancel);
    return () => {
      sheet.removeEventListener("touchstart", onStart);
      sheet.removeEventListener("touchmove", onMove);
      sheet.removeEventListener("touchend", onEnd);
      sheet.removeEventListener("touchcancel", onCancel);
    };
  }, [sheetRef, backdropRef, enabled, onDismiss]);
}
