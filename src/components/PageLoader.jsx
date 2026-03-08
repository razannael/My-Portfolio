import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        if (onComplete) onComplete();
      },
    });

    tl.to(".loader-line", {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut",
    })
      .to(
        ".loader-text-char",
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(".loader-content", {
        opacity: 0,
        duration: 0.3,
        delay: 0.3,
      })
      .to(loaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      });
  });

  if (!visible) return null;

  const name = "RAZAN TOHIMER";

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#060611] flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Background orbs for loader */}
      <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-[#818cf8]/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="loader-content flex flex-col items-center gap-6 relative z-10">
        <div className="overflow-hidden">
          <div className="flex">
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="loader-text-char text-white font-black text-[28px] sm:text-[48px] tracking-tight"
                style={{
                  opacity: 0,
                  transform: "translateY(60px)",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
        <div
          className="loader-line w-[200px] h-[2px] bg-gradient-to-r from-[#818cf8] to-[#a78bfa]"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
