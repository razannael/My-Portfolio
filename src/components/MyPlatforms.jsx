import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { platforms } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

function MyPlatforms() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: footerRef.current, start: "top 95%" } });

      gsap.fromTo(".platform-icon",
        { y: 20, autoAlpha: 0, scale: 0.5 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" }
        }
      );

      gsap.fromTo(".footer-credit",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, delay: 0.5,
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" }
        }
      );

      gsap.fromTo(".footer-year",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerRef} className="pb-10 pt-6">
      <div className="footer-line section-line w-full max-w-md mx-auto mb-8" />

      <div className="flex justify-center gap-5 sm:gap-6 mb-6">
        {platforms.map((plat) => (
          <a
            key={plat.name}
            href={plat.link}
            target="_blank"
            rel="noopener noreferrer"
            className="platform-icon magnetic-btn group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/6 group-hover:border-[#818cf8]/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(129,140,248,0.15)] group-hover:bg-[#818cf8]/5">
              <img
                className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity"
                src={plat.icon}
                alt={plat.name}
              />
            </div>
          </a>
        ))}
      </div>

      <p className="footer-year text-center text-[#3a3a4a] text-[10px] uppercase tracking-[0.15em] mt-1">
        &copy; {new Date().getFullYear()} Razan Tohimer
      </p>
    </div>
  );
}

export default MyPlatforms;
