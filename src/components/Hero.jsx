import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles.js";
import { github1, linkedin, leetcode, youtube } from "../assets/index.js";

gsap.registerPlugin(ScrollTrigger);

/* ── scramble a single character span (split-flap / rubric style) ── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?*+";

function scrambleChar(span, finalChar, delay = 0, duration = 2) {
  const totalFlips = Math.round(duration * 12);
  let flip = 0;
  const id = gsap.delayedCall(delay, () => {
    const step = () => {
      if (flip >= totalFlips) {
        span.textContent = finalChar;
        gsap.to(span, { rotateX: 0, scale: 1, duration: 0.4, ease: "back.out(2)" });
        return;
      }
      span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      gsap.set(span, { rotateX: -8 + Math.random() * 16, scale: 0.96 + Math.random() * 0.08 });
      flip++;
      setTimeout(step, 80);
    };
    step();
  });
  return id;
}

/* ── ScrambleRole component — each char scrambles independently ── */
function ScrambleRole({ text }) {
  const charsRef = useRef([]);
  const containerRef = useRef(null);
  const hasPlayed = useRef(false);

  const runScramble = useCallback(() => {
    charsRef.current.forEach((span, i) => {
      if (!span || text[i] === " ") return;
      scrambleChar(span, text[i], i * 0.08, 1.5 + Math.random() * 0.8);
    });
  }, [text]);

  // expose for timeline
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current._runScramble = runScramble;
      containerRef.current._hasPlayed = hasPlayed;
    }
  }, [runScramble]);

  const handleHover = () => {
    runScramble();
  };

  return (
    <span
      ref={containerRef}
      className="hero-role inline-flex cursor-default"
      onMouseEnter={handleHover}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          className="role-char inline-block"
          style={{
            transformOrigin: "center center",
            width: char === " " ? "0.5em" : undefined,
            perspective: "200px",
          }}
        >
          {char === " " ? "\u00A0" : "\u00A0"}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);
  const nameRef = useRef(null);
  const [lineCount] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      w: 40 + Math.random() * 120,
      rot: -30 + Math.random() * 60,
      delay: Math.random() * 0.5,
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── master timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 1.6 });

      /* 1 — geometric lines fly in */
      tl.fromTo(".hero-geo-line",
        { scaleX: 0, autoAlpha: 0 },
        { scaleX: 1, autoAlpha: 1, duration: 0.6, stagger: { each: 0.06, from: "random" }, ease: "power2.out" }
      );

      /* 2 — label slides in */
      tl.fromTo(".hero-label",
        { x: -40, autoAlpha: 0, skewX: -8 },
        { x: 0, autoAlpha: 1, skewX: 0, duration: 0.7 },
        "-=0.3"
      );

      /* 3 — name characters cascade in */
      tl.fromTo(".hero-char",
        { yPercent: 120, rotateX: -90, autoAlpha: 0 },
        { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 1, stagger: 0.03, ease: "power4.out" },
        "-=0.4"
      );

      /* 4 — role: each char scrambles independently like a split-flap */
      tl.fromTo(".hero-role",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        "-=0.5"
      );
      tl.add(() => {
        const roleEl = heroRef.current?.querySelector(".hero-role");
        if (roleEl?._runScramble) roleEl._runScramble();
      }, "-=0.2");

      /* 5 — divider draws */
      tl.fromTo(".hero-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.3"
      );

      /* 6 — subtitle words stagger in */
      tl.fromTo(".hero-sub-word",
        { yPercent: 100, autoAlpha: 0, rotateX: -40 },
        { yPercent: 0, autoAlpha: 1, rotateX: 0, duration: 0.5, stagger: 0.015, ease: "power3.out" },
        "-=0.4"
      );

      /* 7 — CTA buttons pop in with spring */
      tl.fromTo(".hero-cta-btn",
        { y: 40, autoAlpha: 0, scale: 0.8 },
        { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.3"
      );

      /* 8 — social links cascade */
      tl.fromTo(".hero-social-link",
        { x: -20, autoAlpha: 0, scale: 0.5 },
        { x: 0, autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: "back.out(2)" },
        "-=0.4"
      );

      /* 9 — photo cinematic reveal with clip + scale */
      tl.fromTo(".hero-photo-clip",
        { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.4, ease: "power4.inOut" },
        "-=0.8"
      );

      /* 10 — brackets snap in */
      tl.fromTo(".hero-bracket",
        { scale: 0, autoAlpha: 0, rotate: -45 },
        { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.4, stagger: 0.06, ease: "back.out(3)" },
        "-=0.5"
      );

      /* 11 — floating elements fade in */
      tl.fromTo(".hero-float-el",
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" },
        "-=0.3"
      );

      /* 12 — status badge slides up */
      tl.fromTo(".hero-status",
        { y: 30, autoAlpha: 0, scale: 0.9 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.2"
      );

      /* 13 — big letter fades in */
      tl.fromTo(".hero-big-letter",
        { autoAlpha: 0, scale: 0.5, rotate: -10 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

      /* 14 — scroll indicator */
      tl.fromTo(".hero-scroll-indicator",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );

      /* ── infinite animations ── */

      // orbit rings
      gsap.to(".hero-orbit-ring", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".hero-orbit-ring-2", { rotation: -360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-orbit-ring-3", { rotation: 360, duration: 35, repeat: -1, ease: "none" });

      // scroll dot bounce
      gsap.to(".scroll-dot", { y: 20, duration: 0.7, repeat: -1, yoyo: true, ease: "power1.inOut" });

      // status pulse
      gsap.to(".status-dot", { scale: 1.5, opacity: 0.4, duration: 0.8, repeat: -1, yoyo: true });

      // floating geo lines drift
      gsap.to(".hero-geo-line", {
        y: "random(-15, 15)", x: "random(-10, 10)",
        duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
        stagger: { each: 0.3, from: "random" },
      });

      /* ── scroll-driven parallax EXIT ── */
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      exitTl
        .to(".hero-text-col", { y: -120, autoAlpha: 0.3, scale: 0.95 }, 0)
        .to(".hero-photo-wrap", { y: -60, rotate: 3, scale: 0.97 }, 0)
        .to(".hero-big-letter", { y: -200, autoAlpha: 0, rotate: -5 }, 0)
        .to(".hero-geo-line", { autoAlpha: 0, y: -50, stagger: 0.02 }, 0)
        .to(".hero-orb-1", { y: -150, scale: 1.4, autoAlpha: 0.3 }, 0)
        .to(".hero-orb-2", { y: -80, scale: 0.8 }, 0)
        .to(".hero-scroll-indicator", { autoAlpha: 0, y: -30 }, 0);

    }, heroRef);

    /* ── mouse spotlight ── */
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    const handleMouseMove = (e) => {
      if (!spotlight) return;
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(spotlight, { x: x - 250, y: y - 250, duration: 0.6, ease: "power2.out" });
    };
    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const firstName = "Razan";
  const lastName = "Tohimer";
  const subtitle = "I engineer web experiences — from pixel-perfect UIs to AI-powered developer tools. Currently building for enterprise clients in the US hospitality industry.";

  const socials = [
    { icon: github1, link: "https://github.com/razannael", label: "GH" },
    { icon: linkedin, link: "https://www.linkedin.com/in/razan-tohimer/", label: "LI" },
    { icon: leetcode, link: "https://leetcode.com/ra_zan/", label: "LC" },
    { icon: youtube, link: "https://www.youtube.com/@CodewithRazan", label: "YT" },
  ];

  return (
    <section ref={heroRef} className="relative w-full min-h-screen mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-[#060611]" />

      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] bg-[#818cf8]/[0.04] rounded-full blur-[150px] pointer-events-none"
        style={{ top: 0, left: 0 }}
      />

      {/* Orbs */}
      <div className="hero-orb-1 absolute top-[-15%] right-[-5%] w-[700px] h-[700px] bg-[#818cf8]/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#6366f1]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Geometric lines (shows GSAP stagger mastery) */}
      {lineCount.map((l) => (
        <div
          key={l.id}
          className="hero-geo-line absolute pointer-events-none"
          style={{
            top: `${l.y}%`,
            left: `${l.x}%`,
            width: `${l.w}px`,
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(129,140,248,0.15), transparent)",
            transform: `rotate(${l.rot}deg)`,
            transformOrigin: "center",
          }}
        />
      ))}

      {/* Big decorative letter */}
      <span
        className="hero-big-letter absolute top-[5%] left-[-5%] text-white/[0.015] font-black text-[40vw] leading-none select-none pointer-events-none"
        style={{ fontFamily: "Space Grotesk" }}
      >
        R
      </span>

      <div className={`${styles.paddingX} max-w-7xl mx-auto pt-[130px] pb-[80px] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10`}>
        {/* Left: Text */}
        <div className="hero-text-col flex-1 max-w-xl" style={{ perspective: "1000px" }}>
          <p className="hero-label text-[#818cf8] text-[13px] uppercase tracking-[0.35em] font-medium mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#818cf8]/50 inline-block" />
            Portfolio 2025
          </p>

          {/* Character-by-character name reveal */}
          <h1 ref={nameRef} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <div className="overflow-hidden pb-2" style={{ perspective: "600px" }}>
              {firstName.split("").map((char, i) => (
                <span
                  key={`fn-${i}`}
                  className="hero-char inline-block text-white font-black lg:text-[86px] sm:text-[64px] text-[46px] leading-[0.9] tracking-tight"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="overflow-hidden pb-2" style={{ perspective: "600px" }}>
              {lastName.split("").map((char, i) => (
                <span
                  key={`ln-${i}`}
                  className="hero-char inline-block font-black lg:text-[86px] sm:text-[64px] text-[46px] leading-[0.9] tracking-tight"
                  style={{ transformOrigin: "bottom center" }}
                >
                  <span className="bg-gradient-to-r from-white via-white to-[#818cf8] bg-clip-text text-transparent">
                    {char}
                  </span>
                </span>
              ))}
              <span className="hero-char inline-block text-[#818cf8] font-black lg:text-[86px] sm:text-[64px] text-[46px] leading-[0.9]">.</span>
            </div>
          </h1>

          {/* Split-flap scramble role text — each char animates independently, re-scrambles on hover */}
          <p className="text-[#818cf8]/60 text-[12px] uppercase tracking-[0.4em] font-mono mt-3 mb-1">
            <ScrambleRole text="SOFTWARE ENGINEER" />
          </p>

          <div className="hero-divider w-[60px] h-[2px] bg-gradient-to-r from-[#818cf8] to-[#a78bfa] my-5 origin-left rounded-full" />

          {/* Word-by-word subtitle with 3D rotation */}
          <p className="text-[#a1a1b5] font-light text-[16px] sm:text-[17px] leading-[28px] max-w-md" style={{ perspective: "800px" }}>
            {subtitle.split(" ").map((word, i) => (
              <span key={i} className="hero-sub-word inline-block mr-[0.3em]" style={{ transformOrigin: "bottom center" }}>
                {word}
              </span>
            ))}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3 mt-8 flex-wrap">
            <a
              href="#contact"
              className="hero-cta-btn magnetic-btn border border-white/10 hover:border-[#818cf8]/40 px-7 py-3.5 rounded-full text-white font-medium text-[13px] uppercase tracking-wider transition-all hover:bg-[#818cf8]/5"
            >
              Get in Touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-[#4a4a5a] text-[10px] uppercase tracking-[0.2em] mr-1">Find me</span>
            <div className="w-6 h-[1px] bg-white/10" />
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link magnetic-btn w-10 h-10 flex items-center justify-center rounded-full border border-white/15 hover:border-[#818cf8]/50 transition-all duration-300 hover:bg-[#818cf8]/10 hover:shadow-[0_0_15px_rgba(129,140,248,0.15)]"
              >
                <img src={s.icon} alt={s.label} className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity brightness-0 invert" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Photo with brackets + 3 orbit rings */}
        <div className="hero-photo-wrap relative flex-shrink-0">
          <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] lg:w-[380px] lg:h-[460px]">
            {/* Glow */}
            <div className="absolute inset-0 bg-[#818cf8]/[0.08] rounded-[2rem] blur-[60px] scale-110 animate-pulse-glow" />

            {/* 3 orbit rings */}
            <div className="hero-orbit-ring absolute inset-[-20px] pointer-events-none" style={{ transformOrigin: "center center" }}>
              <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-[#818cf8]/40 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(129,140,248,0.3)]" />
              <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-[#a78bfa]/30 rounded-full -translate-x-1/2" />
            </div>
            <div className="hero-orbit-ring-2 absolute inset-[-40px] pointer-events-none" style={{ transformOrigin: "center center" }}>
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-[#818cf8]/25 rounded-full" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#6366f1]/30 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
            </div>
            <div className="hero-orbit-ring-3 absolute inset-[-60px] pointer-events-none" style={{ transformOrigin: "center center" }}>
              <div className="absolute bottom-[10%] left-0 w-1 h-1 bg-[#818cf8]/15 rounded-full" />
              <div className="absolute top-[20%] right-0 w-1.5 h-1.5 bg-[#a78bfa]/20 rounded-full" />
              <div className="absolute top-0 left-[30%] w-1 h-1 bg-[#818cf8]/20 rounded-full" />
            </div>

            {/* Corner brackets */}
            <div className="hero-bracket absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-[#818cf8]/30 rounded-tl-lg" />
            <div className="hero-bracket absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-[#818cf8]/30 rounded-tr-lg" />
            <div className="hero-bracket absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-[#818cf8]/30 rounded-bl-lg" />
            <div className="hero-bracket absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-[#818cf8]/30 rounded-br-lg" />

            {/* Photo with clip-path reveal + scale */}
            <div className="hero-photo-clip absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#818cf8]/50 via-[#6366f1]/15 to-[#a78bfa]/30 p-[2px]">
              <div className="w-full h-full rounded-[2rem] bg-[#0a0a1a] overflow-hidden">
                <img
                  src="/razan.png"
                  alt="Razan Tohimer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-[#0f0f23]"><span class="text-[#818cf8] font-black text-[80px]" style="font-family:Space Grotesk">R</span></div>';
                  }}
                />
              </div>
            </div>

            {/* Floating geometric elements */}
            <div className="hero-float-el absolute -top-6 -right-6 w-20 h-20 border border-[#818cf8]/10 rounded-2xl animate-float-slow" />
            <div className="hero-float-el absolute -bottom-6 -left-6 w-14 h-14 bg-[#818cf8]/[0.04] rounded-xl animate-float" />
            <div className="hero-float-el absolute top-[20%] -right-10 w-3 h-3 bg-[#818cf8]/20 rounded-full animate-float" />
            <div className="hero-float-el absolute bottom-[30%] -left-8 w-2 h-2 bg-[#a78bfa]/25 rounded-full animate-float-slow" />

            {/* Status badge */}
            <div className="hero-status absolute -bottom-3 left-1/2 -translate-x-1/2 glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5 whitespace-nowrap">
              <span className="status-dot w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[11px] text-[#a1a1b5] uppercase tracking-[0.15em] font-medium">Available for work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <span className="text-[#4a4a5a] text-[10px] uppercase tracking-[0.2em] group-hover:text-[#818cf8]/50 transition-colors">Scroll</span>
          <div className="w-[22px] h-[42px] rounded-3xl border-2 border-white/10 flex justify-center items-start p-1.5 group-hover:border-[#818cf8]/20 transition-colors">
            <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
