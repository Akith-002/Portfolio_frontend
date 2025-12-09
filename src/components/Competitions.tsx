import React, { useEffect, useRef } from "react";
import "../styles/Competitions.css";
import { useCompetitions } from "@/hooks/useApi";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

const Competitions: React.FC = () => {
  const { data: competitions = [], isLoading, error } = useCompetitions();
  const competitionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          } else {
            entry.target.classList.remove("appear");
          }
        });
      },
      { threshold: 0.1 }
    );

    competitionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      competitionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [competitions]);

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("heading-appear");
          } else {
            entry.target.classList.remove("heading-appear");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <section className="py-12 text-white text-center">
        <p>Error loading competitions. Please try again later.</p>
      </section>
    );
  }

  return (
    <section id="competitions" className="relative gradient-bg py-10">
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-white opacity-0 transform translate-y-10 duration-1000"
      >
        Competitions
      </h1>
      <div className="flex flex-col gap-6 flex-wrap justify-center items-center px-5 sm:px-8">
        {isLoading ? (
          <p>Loading competitions...</p>
        ) : (
          competitions.map((competition, index) => (
            <div
              ref={(el) => {
                competitionRefs.current[index] = el;
              }}
              key={competition._id}
              className="card flex flex-col sm:flex-row gap-4 sm:gap-8 transform duration-1000 mb-8 w-full max-w-3xl p-4 bg-transparent shadow-[0_0_14px_1px] shadow-yellow-500 rounded-lg hover:bg-gray-700 opacity-0 translate-y-10"
            >
              <div className="w-full sm:w-2/5 flex justify-center items-center object-cover overflow-hidden rounded-lg shadow-[0_0_8px_1px] shadow-white">
                {competition.image && (
                  <img
                    src={`${BackEnd_URL}${competition.image}`}
                    loading="lazy"
                    alt={competition.title}
                    className="h-48 w-full sm:h-full object-cover rounded"
                  />
                )}
              </div>
              <div className="w-full sm:w-3/5 p-2 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 underline">
                  {competition.title}
                </h2>
                <p className="text-sm sm:text-base text-white">
                  {competition.description}
                </p>
                <a
                  href={competition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm sm:text-base text-yellow-500 bg-transparent border border-yellow-500 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:shadow-lg mt-4"
                >
                  View More
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Competitions;
