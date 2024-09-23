import React, { useEffect, useState } from "react";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

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

  // Handle scrolling to trigger animation
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setScrollPosition(scrollPos);

      // Trigger animation when scrolling past 300px (adjust as needed)
      if (scrollPos > 800) {
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
    <section id="competitions" className="relative gradient-bg py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-white ">
        Competitions
      </h1>
      <div className="flex flex-col gap-6 flex-wrap justify-center items-center">
        {loading ? (
          <p>Loading competitions...</p>
        ) : (
          competitions.map((competition, index) => (
            <div
              key={competition.id}
              className={`card flex gap-8 transition-transform transform ${
                isVisible
                  ? `translate-x-0 opacity-100`
                  : `${
                      index % 2 === 0 ? "-translate-x-16" : "translate-x-16"
                    } opacity-0`
              } duration-4000
              } mb-8 w-full max-w-3xl p-6 bg-transparent shadow-[0_0_20px] shadow-yellow-500 rounded-lg hover:bg-gray-700`}
              style={{ transitionDelay: `${index * 500}ms` }} // Staggered effect
            >
              <div className="w-1/3 flex justify-center items-center object-cover overflow-hidden rounded-lg shadow-[0_0_8px] shadow-white">
                {competition.image && (
                  <img
                    src={`${BackEnd_URL}${competition.image}`}
                    loading="lazy"
                    alt={competition.title}
                    className="h-full w-full object-cover rounded"
                  />
                )}
              </div>
              <div className="w-2/3">
                <h2 className="text-2xl font-semibold mb-4 underline">
                  {competition.title}
                </h2>

                <p className="text-white">{competition.description}</p>
                <a
                  href={competition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 underline mt-2 block"
                >
                  {competition.url}
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
