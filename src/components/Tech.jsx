import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".tech-pill");
    if (!els || els.length === 0) return;

    const ctx = gsap.context(() => {
      // Section scale reveal
      gsap.fromTo(ref.current,
        { scale: 0.95, autoAlpha: 0.5 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 50%", scrub: 1 }
        }
      );

      gsap.fromTo(".tech-sub", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.fromTo(".tech-head", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ref.current, start: "top 80%" } });

      // Pills scatter in from random positions
      els.forEach((pill) => {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = 40 + Math.random() * 30;
        const randomRotate = (Math.random() - 0.5) * 20;
        gsap.fromTo(pill,
          { x: randomX, y: randomY, autoAlpha: 0, scale: 0.8, rotation: randomRotate },
          { x: 0, y: 0, autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6 + Math.random() * 0.3,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: ref.current, start: "top 75%" }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-[-15%] w-[350px] h-[350px] bg-[#6366f1]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12">
        <p className={`tech-sub ${styles.sectionSubText}`}>What I work with</p>
        <h2 className={`tech-head ${styles.sectionHeadText}`}>Technologies<span className="text-[#818cf8]">.</span></h2>
      </div>
      <div className="tech-grid flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {technologies.map((tech) => (
          <div key={tech.name} className="tech-pill group glass-card flex items-center gap-3 rounded-full px-5 py-3 cursor-default hover:scale-105 duration-300">
            {tech.icon ? (
              <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
            ) : (
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#818cf8]/10 text-[#818cf8] text-[10px] font-bold">{tech.name.charAt(0)}</span>
            )}
            <span className="text-[#a1a1b5] group-hover:text-white text-[13px] font-medium transition-colors">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
