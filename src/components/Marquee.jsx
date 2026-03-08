const techs = ["REACT", "NEXT.JS", "THREE.JS", "GSAP", "TYPESCRIPT", "PYTHON", "NODE.JS", "TAILWIND", "MONGODB", "DOCKER", "FIGMA", "GIT"];

const MarqueeRow = ({ reverse }) => (
  <div className={`flex gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
    {[...techs, ...techs].map((t, i) => (
      <span key={i} className="flex items-center gap-4 whitespace-nowrap">
        <span
          className="text-white/[0.04] font-black text-[60px] sm:text-[80px] tracking-tight select-none"
          style={{ fontFamily: "Space Grotesk, sans-serif", WebkitTextStroke: "1px rgba(129,140,248,0.08)" }}
        >
          {t}
        </span>
        <span className="w-2 h-2 rounded-full bg-[#818cf8]/20 flex-shrink-0" />
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="w-full overflow-hidden py-8 sm:py-12 relative">
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060611] to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060611] to-transparent z-10 pointer-events-none" />
    <MarqueeRow />
  </div>
);

export default Marquee;
