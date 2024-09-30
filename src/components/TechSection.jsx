import React, { useEffect, useRef } from "react";
import c from "/assets/icons/c-original.svg";
import html from "/assets/icons/html5-original.svg";
import css from "/assets/icons/css3-original.svg";
import js from "/assets/icons/javascript-original.svg";
import reactIcon from "/assets/icons/react-original.svg";
import figma from "/assets/icons/figma-original.svg";
import git from "/assets/icons/git-original.svg";
import jupyter from "/assets/icons/jupyter-original.svg";
import matplotlib from "/assets/icons/matplotlib-original.svg";
import numpy from "/assets/icons/numpy-original.svg";
import vuejs from "/assets/icons/vuejs-original.svg";
import nuxtjs from "/assets/icons/nuxtjs-original.svg";
import pandas from "/assets/icons/pandas-original.svg";
import python from "/assets/icons/python-original.svg";
import tailwindcss from "/assets/icons/tailwindcss-original.svg";
import vscode from "/assets/icons/vscode-original.svg";

import "../styles/Tech.css";

const categories = [
  {
    title: "Programming Languages",
    icons: [
      { src: c, alt: "C", link: "https://en.cppreference.com/w/c" },
      { src: python, alt: "Python", link: "https://www.python.org/" },
      {
        src: js,
        alt: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    ],
  },
  {
    title: "Frontend Frameworks & Libraries",
    icons: [
      {
        src: html,
        alt: "HTML",
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        src: css,
        alt: "CSS",
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        src: tailwindcss,
        alt: "Tailwind CSS",
        link: "https://tailwindcss.com/",
      },
      { src: reactIcon, alt: "React", link: "https://react.dev/" },
      { src: vuejs, alt: "Vue.js", link: "https://vuejs.org/" },
      { src: nuxtjs, alt: "Nuxt.js", link: "https://nuxt.com/" },
    ],
  },
  {
    title: "Design and Tools",
    icons: [
      { src: figma, alt: "Figma", link: "https://www.figma.com/" },
      { src: vscode, alt: "VSCode", link: "https://code.visualstudio.com/" },
      { src: git, alt: "Git", link: "https://git-scm.com/" },
    ],
  },
  {
    title: "Data Science & Analytics",
    icons: [
      { src: jupyter, alt: "Jupyter", link: "https://jupyter.org/" },
      { src: matplotlib, alt: "Matplotlib", link: "https://matplotlib.org/" },
      { src: numpy, alt: "NumPy", link: "https://numpy.org/" },
      { src: pandas, alt: "Pandas", link: "https://pandas.pydata.org/" },
    ],
  },
];

const TechSection = () => {
  const iconRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          } else {
            entry.target.classList.remove("animate-fadeIn");
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the element is visible
    );

    iconRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      iconRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section
      className="flex flex-col items-center w-full py-12 bg-gradient-to-b from-gray-800 to-gray-600"
      id="tech"
    >
      <h2 className="text-4xl md:text-5xl text-white font-bold">
        Technologies
      </h2>

      {categories.map((category, index) => (
        <div key={index} className="w-full mt-14">
          <h3 className="text-3xl gradient-text text-center font-semibold mb-8">
            {category.title}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-[60px] lg:gap-[80px]">
            {category.icons.map((icon, i) => (
              <a
                key={icon.alt}
                href={icon.link}
                target="_blank"
                rel="noreferrer"
                className="flex justify-center items-center opacity-0 transition-opacity duration-500 hover:scale-105"
                ref={(el) => (iconRefs.current[i + index * 10] = el)} // Combine index and i for unique keys
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 duration-500 hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TechSection;
