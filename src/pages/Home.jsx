import React from "react";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import NavbarDesktop from "../components/NavbarDesktop";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div
      className="size-full"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), radial-gradient(at top center, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 120%) #989898",
        backgroundBlendMode: "multiply, multiply",
      }}
    >
      <NavbarDesktop />
      <HeroSection />
      <Projects />
      <Blogs />
    </div>
  );
};

export default Home;
