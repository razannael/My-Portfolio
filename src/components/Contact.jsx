import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section scale-in
      gsap.fromTo(sectionRef.current,
        { scale: 0.95, autoAlpha: 0.5 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", end: "top 60%", scrub: 1 }
        }
      );

      gsap.fromTo(".contact-form",
        { x: -80, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
      gsap.fromTo(".contact-earth",
        { x: 80, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      // Stagger form fields
      gsap.fromTo(".contact-field",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, {
        name: form.name,
        email: form.email,
        title: form.name,
        message: form.message,
      }, publicKey)
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  const inputClass =
    "bg-[#0a0a1a]/80 border border-white/6 focus:border-[#818cf8]/40 py-4 px-5 placeholder:text-[#4a4a5a] text-white rounded-xl outline-none font-light text-[14px] transition-all focus:shadow-[0_0_30px_rgba(129,140,248,0.06)]";

  return (
    <div
      ref={sectionRef}
      className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative"
    >
      {/* Big decorative text */}
      <span className="absolute top-[-10%] left-[-5%] text-white/[0.012] font-black text-[200px] sm:text-[300px] leading-none select-none pointer-events-none" style={{ fontFamily: "Space Grotesk" }}>
        SAY HI
      </span>

      <div className="contact-form flex-[0.75] glass-card p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-[#818cf8]/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>
          Contact<span className="text-[#818cf8]">.</span>
        </h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 relative z-10">
          <label className="contact-field flex flex-col gap-2">
            <span className="text-white font-medium text-[13px] uppercase tracking-wider">Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
          </label>
          <label className="contact-field flex flex-col gap-2">
            <span className="text-white font-medium text-[13px] uppercase tracking-wider">Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" className={inputClass} />
          </label>
          <label className="contact-field flex flex-col gap-2">
            <span className="text-white font-medium text-[13px] uppercase tracking-wider">Message</span>
            <textarea rows={5} name="message" value={form.message} onChange={handleChange} placeholder="What would you like to say?" className={inputClass} />
          </label>

          <button
            type="submit"
            className="contact-field magnetic-btn bg-[#818cf8] hover:bg-[#6366f1] text-white py-3 px-8 rounded-full w-fit font-semibold text-[13px] uppercase tracking-wider transition-all hover:shadow-[0_0_25px_rgba(129,140,248,0.3)]"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="contact-earth xl:flex-1 xl:h-auto md:h-[450px] h-[250px]">
        <EarthCanvas />
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
