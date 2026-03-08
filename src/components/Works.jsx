import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ name, description, tags, image, source_code_link, index }) => (
  <div className="project-card flex-shrink-0 w-[85vw] sm:w-[500px] group glass-card rounded-2xl overflow-hidden">
    <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060611] via-[#060611]/30 to-transparent" />
      <div className="absolute top-4 right-4">
        <div
          onClick={() => window.open(source_code_link, "_blank")}
          className="magnetic-btn w-10 h-10 rounded-full bg-[#060611]/60 backdrop-blur-md border border-white/10 flex justify-center items-center cursor-pointer hover:border-[#818cf8]/50 transition-all hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]"
        >
          <img src={github} alt="source code" className="w-4 h-4 object-contain invert" />
        </div>
      </div>
      <div className="absolute bottom-4 left-6">
        <span className="text-[#818cf8]/60 text-[12px] font-mono">0{index + 1}</span>
      </div>
    </div>
    <div className="p-6 sm:p-8">
      <h3 className="text-white font-bold text-[22px] sm:text-[26px] tracking-tight group-hover:text-[#818cf8] transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        {name}
      </h3>
      <p className="mt-3 text-[#a1a1b5] text-[14px] leading-[24px] font-light line-clamp-3">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={`${name}-${tag.name}`} className="text-[11px] text-[#818cf8]/80 bg-[#818cf8]/[0.06] px-3 py-1.5 rounded-full font-medium border border-[#818cf8]/10">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Works = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(".works-sub", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(".works-head", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(".works-desc", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(".works-progress-wrap", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });

      // Horizontal scroll pinning
      const totalScroll = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * projects.length),
              projects.length - 1
            );
            setCurrentIndex(newIndex);
          },
        },
      });

      // Progress bar
      gsap.fromTo(".works-progress-bar",
        { scaleX: 0 },
        { scaleX: 1, ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Header */}
      <div ref={headerRef} className="sm:px-16 px-6 sm:py-16 py-10 max-w-6xl mx-auto relative z-0">
        <span className="hash-span" id="projects">&nbsp;</span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className={`works-sub ${styles.sectionSubText}`}>My work</p>
            <h2 className={`works-head ${styles.sectionHeadText}`}>Projects<span className="text-[#818cf8]">.</span></h2>
            <p className="works-desc mt-4 text-[#a1a1b5] text-[16px] max-w-xl leading-[28px] font-light">
              Real-world projects that showcase what I can build. Scroll to explore.
            </p>
          </div>
          {/* Progress indicator */}
          <div className="works-progress-wrap flex flex-col items-end gap-2">
            <span className="text-[#818cf8] text-[32px] font-black" style={{ fontFamily: "Space Grotesk" }}>
              0{currentIndex + 1}<span className="text-[#a1a1b5]/30 text-[18px] font-normal"> / 0{projects.length}</span>
            </span>
            <div className="w-[120px] h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="works-progress-bar h-full bg-gradient-to-r from-[#818cf8] to-[#a78bfa] origin-left" />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll — full viewport height, cards centered */}
      <div ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#818cf8]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#6366f1]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        {/* Big faded project number in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="text-white/[0.015] font-black text-[30vw] leading-none select-none transition-all duration-500"
            style={{ fontFamily: "Space Grotesk" }}
          >
            0{currentIndex + 1}
          </span>
        </div>

        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex gap-6 sm:gap-8 items-center px-6 sm:px-16 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} {...project} index={index} />
          ))}
          {/* End CTA */}
          <div className="flex-shrink-0 w-[60vw] sm:w-[30vw] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#818cf8] text-[14px] uppercase tracking-[0.3em] font-medium">Want more?</p>
              <a
                href="https://github.com/razannael"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center gap-2 mt-3 text-white hover:text-[#818cf8] text-[18px] font-bold transition-colors"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                View GitHub <span className="text-[24px]">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
