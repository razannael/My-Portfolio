import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles.js";
import { services } from "../constants/index.js";
import { SectionWrapper } from "../hoc/index.js";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ title, icon, index }) => (
  <div
    className="service-card group relative glass-card rounded-2xl p-8 flex flex-col items-center gap-4 w-[220px] overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-[#818cf8]/10 group-hover:bg-[#818cf8]/20 transition-colors group-hover:scale-110 duration-300">
      <img src={icon} alt={title} className="w-8 h-8 object-contain" />
    </div>
    <h3 className="relative text-white text-[15px] font-semibold text-center">{title}</h3>
    <span className="absolute top-3 right-4 text-[#818cf8]/10 text-[40px] font-black" style={{ fontFamily: "Space Grotesk" }}>0{index + 1}</span>
  </div>
);

function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section scale-in reveal
      gsap.fromTo(ref.current,
        { scale: 0.95, autoAlpha: 0.5 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 50%", scrub: 1 }
        }
      );

      gsap.fromTo(".about-sub", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.fromTo(".about-head", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ref.current, start: "top 80%" } });

      // Word-by-word text reveal
      gsap.fromTo(".about-word",
        { yPercent: 80, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.4, stagger: 0.015, ease: "power3.out",
          scrollTrigger: { trigger: ".about-text-wrap", start: "top 85%" }
        }
      );

      // Cards stagger from bottom with rotation
      gsap.fromTo(".service-card",
        { y: 60, autoAlpha: 0, rotateY: -15 },
        { y: 0, autoAlpha: 1, rotateY: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const aboutText = "Software Engineer with a BSc in Computer Systems Engineering from Palestine Technical University. I build performant web applications with deep expertise in React, Next.js, TypeScript, and Python. I've solved over 1,000 LeetCode problems, built an AI-powered GitHub App (RazoraAI) with 56 tests and full CI/CD, and worked with enterprise clients in the US luxury hospitality industry. I care about clean code, smooth animations, and solving hard problems.";

  return (
    <div ref={ref} className="relative" style={{ perspective: "1000px" }}>
      <div className="absolute top-0 right-[-20%] w-[400px] h-[400px] bg-[#818cf8]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <p className={`about-sub ${styles.sectionSubText}`}>Introduction</p>
      <h2 className={`about-head ${styles.sectionHeadText}`}>Overview<span className="text-[#818cf8]">.</span></h2>

      <div className="about-text-wrap mt-6 max-w-3xl overflow-hidden">
        <p className="text-[#a1a1b5] text-[16px] leading-[30px] font-light">
          {aboutText.split(" ").map((word, i) => (
            <span key={i} className="about-word inline-block mr-[0.3em]">{word}</span>
          ))}
        </p>
      </div>

      <div className="about-cards mt-16 flex flex-wrap gap-5 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(About, "about");
