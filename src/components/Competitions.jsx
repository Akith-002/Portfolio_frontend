import React, { useEffect, useRef, useState } from "react";
import "../styles/Competitions.css";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const competitionRefs = useRef([]); // Create refs for each competition

  // Fetch competitions from API
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/competitions`);
        const data = await response.json();
        setCompetitions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  // Use Intersection Observer for scroll-triggered animations
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

    competitionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      competitionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="competitions" className="relative gradient-bg py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-white ">
        Competitions
      </h1>
      <div className="flex flex-col gap-6 flex-wrap justify-center items-center px-4 sm:px-8">
        {loading ? (
          <p>Loading competitions...</p>
        ) : (
          competitions.map((competition, index) => (
            <div
              key={competition.id}
              ref={(el) => (competitionRefs.current[index] = el)} // Store ref for each competition
              className={`card flex flex-col sm:flex-row gap-4 sm:gap-8 transition-opacity transform opacity-0 mb-8 w-full max-w-3xl p-4 bg-transparent shadow-[0_0_20px] shadow-yellow-500 rounded-lg hover:bg-gray-700`}
            >
              <div className="w-full sm:w-2/5 flex justify-center items-center object-cover overflow-hidden rounded-lg shadow-[0_0_8px] shadow-white">
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
                  className="view-more-link text-yellow-500 font-semibold underline mt-2 block relative py-2 px-4 transition-all duration-300 ease-in-out"
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
