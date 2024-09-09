import React, { useState, useEffect } from "react";
import c from "../assets/icons/c-original.svg";
import html from "../assets/icons/html5-original.svg";
import css from "../assets/icons/css3-original.svg";
import js from "../assets/icons/javascript-original.svg";
import reactIcon from "../assets/icons/react-original.svg";
import figma from "../assets/icons/figma-original.svg";
import git from "../assets/icons/git-original.svg";
import jupyter from "../assets/icons/jupyter-original.svg";
import matplotlib from "../assets/icons/matplotlib-original.svg";
import numpy from "../assets/icons/numpy-original.svg";
import nuxtjs from "../assets/icons/nuxtjs-original.svg";
import pandas from "../assets/icons/pandas-original.svg";
import python from "../assets/icons/python-original.svg";
import tailwindcss from "../assets/icons/tailwindcss-original.svg";
import vscode from "../assets/icons/vscode-original.svg";

const TechSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY; // Get scroll position
      setScrollPosition(scrollPos);

      // Trigger animation when scrolling past 300px (adjust as needed)
      if (scrollPos > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollPosition]);

  return (
    <div
      className="flex flex-col items-center w-full h-128 py-8 bg-gradient-to-b from-gray-800 to-gray-600"
      id="tech"
    >
      {/* Apply slide-in animation when visible */}
      <h2
        className={`text-4xl text-white font-bold transition-transform duration-1000 ${
          isVisible
            ? "transform translate-y-0 opacity-100"
            : "transform -translate-y-10 opacity-0"
        }`}
      >
        Technologies
      </h2>

      <div className="flex flex-col items-center justify-evenly h-full w-5/6">
        <div className="flex flex-wrap justify-center gap-16 w-full">
          <div className="hover:animate-tilt">
            <img src={c} alt="c" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={html} alt="html" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={css} alt="css" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={js} alt="js" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={tailwindcss} alt="tailwindcss" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={reactIcon} alt="reactIcon" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={nuxtjs} alt="nuxtjs" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={figma} alt="figma" className="w-24 h-24" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-16 w-full">
          <div className="hover:animate-tilt">
            <img src={python} alt="python" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={jupyter} alt="jupyter" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={matplotlib} alt="matplotlib" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={numpy} alt="numpy" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={pandas} alt="pandas" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={git} alt="git" className="w-24 h-24" />
          </div>
          <div className="hover:animate-tilt">
            <img src={vscode} alt="vscode" className="w-24 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSection;
