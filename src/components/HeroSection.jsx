import React from "react";
import { Button } from "@material-tailwind/react";
import myimg from "/assets/images/myImg.jpg";

const HeroSection = () => {
  return (
    <section
      className="w-full h-full flex flex-col justify-center items-center mt-10"
      style={{
        background:
          "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
      }}
    >
      <div className="flex flex-col h-3/4 my-24 gap-4 items-center text-white md:my-20">
        <div className="flex flex-col gap-4 items-center">
          <img
            src={myimg}
            loading="lazy"
            alt="myimg"
            className="w-40 h-40 md:w-60 md:h-60 rounded-full border border-2 border-yellow-600 animate-slidein opacity-0 [--slidein-delay:300ms] shadow-[0_0_10px_3px] shadow-yellow-400"
          />
          <p className="text-lg md:text-xl animate-slidein opacity-0 [--slidein-delay:300ms]">
            Hi, I'm Akith Chandinu👋
          </p>
        </div>
        <p className="text-4xl md:text-6xl w-11/12 md:w-3/4 animate-slidein mb-4 md:mb-6 opacity-0 [--slidein-delay:500ms] text-center">
          A Passionate Developer & Undergraduate from the University of Moratuwa
        </p>
        <a href="#tech">
          <Button className="flex items-center gap-2 bg-white text-black rounded-full animate-slidein opacity-0 [--slidein-delay:700ms] hover:shadow-[0_0_2px_2px] hover:shadow-yellow-400">
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
