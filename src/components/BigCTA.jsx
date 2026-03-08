import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BigCTA = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale text from huge to normal
      gsap.fromTo(".cta-line",
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      gsap.fromTo(".cta-sub",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );

      gsap.fromTo(".cta-btn",
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ref.current, start: "top 65%" }
        }
      );

      // Parallax orbs
      gsap.to(".cta-orb", {
        y: -60, scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 2 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="cta-orb absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[#818cf8]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="cta-orb absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#6366f1]/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <div className="overflow-hidden">
          <h2
            className="cta-line text-white font-black text-[36px] sm:text-[56px] lg:text-[72px] tracking-tight leading-[1.05]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Have a project in mind<span className="text-[#818cf8]">?</span>
          </h2>
        </div>
        <div className="overflow-hidden">
          <h2
            className="cta-line text-white font-black text-[36px] sm:text-[56px] lg:text-[72px] tracking-tight leading-[1.05]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let&apos;s work <span className="bg-gradient-to-r from-[#818cf8] to-[#a78bfa] bg-clip-text text-transparent">together</span><span className="text-[#818cf8]">.</span>
          </h2>
        </div>

        <p className="cta-sub mt-6 text-[#a1a1b5] text-[16px] max-w-lg mx-auto font-light leading-[28px]">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        </p>

        <a
          href="#contact"
          className="cta-btn magnetic-btn inline-flex items-center gap-3 mt-8 bg-[#818cf8] hover:bg-[#6366f1] text-white px-10 py-4 rounded-full font-semibold text-[14px] uppercase tracking-wider transition-all hover:shadow-[0_0_40px_rgba(129,140,248,0.3)]"
        >
          Start a Conversation
          <span className="text-[18px]">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default BigCTA;
