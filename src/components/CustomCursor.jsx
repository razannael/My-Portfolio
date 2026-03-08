import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const grow = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.12, duration: 0.3 });
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
    };

    const shrink = () => {
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    // Magnetic effect for buttons
    const magneticEls = document.querySelectorAll(".magnetic-btn");
    const magneticHandlers = [];

    magneticEls.forEach((el) => {
      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.2;
        const deltaY = (e.clientY - centerY) * 0.2;
        gsap.to(el, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out" });
      };
      const handleLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      magneticHandlers.push({ el, handleMove, handleLeave });
    });

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      magneticHandlers.forEach(({ el, handleMove, handleLeave }) => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  const isTouchDevice =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#818cf8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#818cf8] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-30"
      />
    </>
  );
};

export default CustomCursor;
