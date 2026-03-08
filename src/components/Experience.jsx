import { useRef, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentArrowStyle={{ borderRight: "7px solid rgba(129,140,248,0.12)" }}
    date={experience.date}
    iconStyle={{ background: "#0f0f23", border: "2px solid #818cf8", boxShadow: "0 0 20px rgba(129,140,248,0.15)" }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img src={experience.icon} alt={experience.company_name} className="w-[55%] h-[55%] object-contain" />
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[20px] font-bold tracking-tight">{experience.title}</h3>
      <p className="text-[#818cf8] text-[14px] font-medium" style={{ margin: 0 }}>{experience.company_name}</p>
      <p className="text-[#a1a1b5] text-[12px]" style={{ margin: 0 }}>{experience.location}</p>
    </div>
    <ul className="mt-4 list-none space-y-2">
      {experience.points.map((point, index) => (
        <li key={`exp-${index}`} className="text-[#a1a1b5] text-[13px] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#818cf8]/40">
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section scale-in
      gsap.fromTo(ref.current,
        { scale: 0.95, autoAlpha: 0.5 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 60%", scrub: 1 }
        }
      );

      gsap.fromTo(".exp-sub", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: ref.current, start: "top 85%" } });
      gsap.fromTo(".exp-head", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ref.current, start: "top 85%" } });

      // Animate timeline elements
      gsap.fromTo(".vertical-timeline-element",
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".vertical-timeline", start: "top 80%" }
        }
      );

      // Big number parallax
      gsap.to(".exp-big-number", {
        y: -80, scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 2 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="absolute top-[10%] left-[-15%] w-[400px] h-[400px] bg-[#818cf8]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Big decorative number */}
      <span className="exp-big-number absolute top-[-5%] right-[-5%] text-white/[0.015] font-black text-[300px] sm:text-[400px] leading-none select-none pointer-events-none" style={{ fontFamily: "Space Grotesk" }}>
        03
      </span>

      <div className="text-center relative z-10">
        <p className={`exp-sub ${styles.sectionSubText}`}>What I have done so far</p>
        <h2 className={`exp-head ${styles.sectionHeadText}`}>Experience<span className="text-[#818cf8]">.</span></h2>
      </div>
      <div className="mt-16 flex flex-col relative z-10">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
