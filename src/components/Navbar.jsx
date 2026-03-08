import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles.js";
import { navLinks } from "../constants/index.js";
import { logo, menu, close } from "../assets/index.js";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-detect active section on scroll
  useEffect(() => {
    const sections = navLinks.map((l) => l.id);
    const triggers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(navLinks.find((l) => l.id === id)?.title || ""),
        onEnterBack: () => setActive(navLinks.find((l) => l.id === id)?.title || ""),
      });
    });
    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60, opacity: 0, duration: 0.8, ease: "power3.out", delay: 2,
    });
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setToggle(false);
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, { scrollTo: { y: el, offsetY: 80 }, duration: 1, ease: "power2.inOut" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-500 ${
        scrolled ? "bg-[#060611]/80 backdrop-blur-xl border-b border-[#818cf8]/5" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <p className="text-white text-[15px] font-bold cursor-pointer tracking-tight">
            Razan<span className="text-[#818cf8]">.</span>
            <span className="text-[#a1a1b5] font-light text-[13px] ml-1 hidden sm:inline">
              Software Engineer
            </span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="relative"
              onClick={() => setActive(link.title)}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`${
                  active === link.title ? "text-white" : "text-[#a1a1b5]"
                } hover:text-white text-[13px] font-medium cursor-pointer transition-colors uppercase tracking-wider`}
              >
                {link.title}
              </a>
              {/* Active indicator dot */}
              <span
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#818cf8] transition-all duration-300 ${
                  active === link.title ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              />
            </li>
          ))}
          <li>
            <a
              href="/Razan_Tohimer_CV.pdf"
              download
              className="magnetic-btn text-[12px] font-semibold text-white bg-[#818cf8] hover:bg-[#6366f1] px-4 py-2 rounded-full uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(129,140,248,0.25)]"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[24px] h-[24px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glass-card absolute top-20 right-4 min-w-[180px] z-10 rounded-2xl`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-[#818cf8]" : "text-[#a1a1b5]"
                  } font-medium cursor-pointer text-[14px] uppercase tracking-wider`}
                  onClick={() => { setToggle(false); setActive(link.title); }}
                >
                  <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}>
                    {link.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Razan_Tohimer_CV.pdf"
                  download
                  className="text-[#818cf8] font-medium text-[14px] uppercase tracking-wider"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
