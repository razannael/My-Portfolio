import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#818cf8] to-[#a78bfa] z-50"
      style={{ transform: "scaleX(0)", transformOrigin: "left" }}
    />
  );
};

export default ScrollProgress;
