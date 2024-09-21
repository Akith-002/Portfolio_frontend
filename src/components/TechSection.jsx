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
    <section
      className="flex flex-col items-center w-full h-128 py-8 bg-gradient-to-b from-gray-800 to-gray-600"
      id="tech"
    >
      {/* Apply slide-in animation when visible */}
      <h2
        className={`text-5xl text-white font-bold transition-transform duration-1000 ${
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
            <a
              href="https://en.cppreference.com/w/c"
              target="_blank"
              rel="noreferrer"
            >
              <img src={c} alt="C" loading="lazy" className="w-24 h-24" />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank"
              rel="noreferrer"
            >
              <img src={html} alt="HTML" loading="lazy" className="w-24 h-24" />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              rel="noreferrer"
            >
              <img src={css} alt="CSS" loading="lazy" className="w-24 h-24" />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={js}
                alt="JavaScript"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
              <img
                src={tailwindcss}
                alt="Tailwind CSS"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://react.dev/" target="_blank" rel="noreferrer">
              <img
                src={reactIcon}
                alt="React"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://nuxt.com/" target="_blank" rel="noreferrer">
              <img
                src={nuxtjs}
                alt="Nuxt.js"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://www.figma.com/" target="_blank" rel="noreferrer">
              <img
                src={figma}
                alt="Figma"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-16 w-full">
          <div className="hover:animate-tilt">
            <a href="https://www.python.org/" target="_blank" rel="noreferrer">
              <img
                src={python}
                alt="Python"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://jupyter.org/" target="_blank" rel="noreferrer">
              <img
                src={jupyter}
                alt="Jupyter"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://matplotlib.org/" target="_blank" rel="noreferrer">
              <img
                src={matplotlib}
                alt="Matplotlib"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://numpy.org/" target="_blank" rel="noreferrer">
              <img
                src={numpy}
                alt="NumPy"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a
              href="https://pandas.pydata.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={pandas}
                alt="Pandas"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
              <img src={git} alt="Git" loading="lazy" className="w-24 h-24" />
            </a>
          </div>
          <div className="hover:animate-tilt">
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={vscode}
                alt="VSCode"
                loading="lazy"
                className="w-24 h-24"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
