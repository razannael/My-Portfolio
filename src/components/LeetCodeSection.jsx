import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CircleProgress = ({ count }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(count / 1000, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(129,140,248,0.06)" strokeWidth="2" />
        {/* Progress circle */}
        <circle
          cx="100" cy="100" r={radius} fill="none"
          stroke="url(#circleGrad)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-100"
        />
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[#818cf8] font-black text-[48px] sm:text-[56px] leading-none" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          {count}+
        </span>
        <span className="text-[#a1a1b5] text-[11px] mt-1 uppercase tracking-wider">Problems Solved</span>
      </div>
    </div>
  );
};

const LeetCodeSection = () => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-in card
      gsap.fromTo(".lc-card",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 60%", scrub: 1 }
        }
      );

      // Counter
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 1000, duration: 2.5, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        onUpdate: () => setCount(Math.floor(counter.val)),
      });

      // Stats stagger
      gsap.fromTo(".lc-stat",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="sm:px-16 px-6 sm:py-10 py-6 max-w-6xl mx-auto relative z-0">
      <div className="lc-card relative overflow-hidden glass-card rounded-2xl p-8 sm:p-12">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#818cf8]/[0.05] rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-[#6366f1]/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <p className="text-[#818cf8] text-[13px] uppercase tracking-[0.35em] font-medium">Competitive Edge</p>
            <h2 className="text-white font-black text-[40px] sm:text-[50px] mt-2 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Problem Solver<span className="text-[#818cf8]">.</span>
            </h2>
            <p className="mt-3 text-[#a1a1b5] text-[15px] max-w-md leading-[26px] font-light">
              Sharpening algorithmic thinking daily — tackling data structures, dynamic programming, graphs, and system design problems.
            </p>
            <div className="lc-stats flex gap-8 mt-6">
              <div className="lc-stat"><span className="text-white font-bold text-[14px]">DS &amp; Algo</span><p className="text-[#a1a1b5] text-[12px]">Data Structures</p></div>
              <div className="lc-stat"><span className="text-white font-bold text-[14px]">System Design</span><p className="text-[#a1a1b5] text-[12px]">Architecture</p></div>
              <div className="lc-stat"><span className="text-white font-bold text-[14px]">Dynamic Prog</span><p className="text-[#a1a1b5] text-[12px]">Optimization</p></div>
            </div>
            <a href="https://leetcode.com/ra_zan/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#818cf8] hover:text-[#a78bfa] text-[13px] font-medium uppercase tracking-wider transition-colors">
              View LeetCode Profile <span>&rarr;</span>
            </a>
          </div>
          <div className="lc-counter flex flex-col items-center">
            <CircleProgress count={count} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeSection;
