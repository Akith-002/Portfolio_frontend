import React, { Suspense } from "react";
const Projects = React.lazy(() => import("../components/Projects"));
const Blogs = React.lazy(() => import("../components/Blogs"));
const NavbarDesktop = React.lazy(() => import("../components/NavbarDesktop"));
const HeroSection = React.lazy(() => import("../components/HeroSection"));
const TechSection = React.lazy(() => import("../components/TechSection"));
const Footer = React.lazy(() => import("../components/Footer"));
const SpeedDialButton = React.lazy(
  () => import("../components/SpeedDialButton")
);
const Competitions = React.lazy(() => import("../components/Competitions"));
import "../styles/Loading.css";

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const Home: React.FC = () => {
  return (
    <main
      className="w-full min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), radial-gradient(at top center, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 120%) #989898",
        backgroundBlendMode: "multiply, multiply",
      }}
    >
      <Suspense fallback={<Loader />}>
        <NavbarDesktop />
        <SpeedDialButton />
        <HeroSection />
        <TechSection />
        <Competitions />
        <Projects />
        <Blogs />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home;
