import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";

gsap.registerPlugin(ScrollTrigger);

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section className={`${styles.padding} max-w-6xl mx-auto relative z-0`}>
        <span className="hash-span" id={idName}>&nbsp;</span>
        <Component />
      </section>
    );
  };

export default StarWrapper;
