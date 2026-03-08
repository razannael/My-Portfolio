import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  LeetCodeSection,
  ScrollProgress,
  PageLoader,
  CustomCursor,
  StarsCanvas,
} from "./components";
import Marquee from "./components/Marquee.jsx";
import BigCTA from "./components/BigCTA.jsx";
import MyPlatforms from "./components/MyPlatforms.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <PageLoader />
      <CustomCursor />
      <div className="relative z-0 bg-primary">
        <div className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Marquee />
        <LeetCodeSection />
        <Experience />
        <Tech />
        <Works />
        <BigCTA />
        <div className="relative z-0">
          <Contact />
          <MyPlatforms />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
