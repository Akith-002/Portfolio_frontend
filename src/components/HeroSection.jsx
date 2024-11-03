import React from "react";
import { Button } from "@material-tailwind/react";
import myimg from "/assets/images/myImg.jpg";

const HeroSection = () => {
  return (
    <section
      className="w-full h-full flex flex-col justify-center items-center mt-16"
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
        <div className="flex gap-4 md:gap-10 items-center justify-center flex-wrap mx-2">
          <a href="#tech">
            <Button className="flex items-center gap-2 md:text-md bg-white text-black rounded-full animate-slidein opacity-0 [--slidein-delay:700ms] hover:shadow-[0_0_2px_2px] hover:shadow-yellow-400">
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

          <a
            href="https://drive.google.com/file/d/1OVjt5HWK1U9gMlqIVUoUo6mTtLVX7ZLa/view?usp=sharing"
            target="_blank"
          >
            <Button className="flex items-center px-7 gap-2 md:text-md  bg-black text-yellow-500 rounded-full animate-slidein opacity-0 [--slidein-delay:700ms] hover:shadow-[0_0_2px_2px] hover:shadow-yellow-400">
              Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
