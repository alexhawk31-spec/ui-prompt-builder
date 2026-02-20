import { useState, useEffect, useCallback } from "react";

/**
 * Hook for drag-along-track interactions.
 * Returns { dragging, onPointerDown } — attach onPointerDown to the track element.
 * Calls `onMove(clientX)` during drag so the consumer can map position → value.
 */
export function useDrag(onMove) {
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      onMove(x);
    },
    [onMove],
  );

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      if (x != null) onMove(x);
    };
    const handleUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging, onMove]);

  return { dragging, onPointerDown };
}
