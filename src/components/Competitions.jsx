import React, { useEffect, useState } from "react";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  // Fetch competitions from API
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch("http://localhost:5000/competitions");
        const data = await response.json();
        setCompetitions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY; // Get scroll position
      setScrollPosition(scrollPos);

      // Trigger animation when scrolling past 300px (adjust as needed)
      if (scrollPos > 1400) {
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
    <section>
      <h1>Competions</h1>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Loading competitions...</p>
        ) : (
          competitions.map((competition) => (
            <div key={competition.id} className="card">
              <h2>{competition.title}</h2>
              <img src={competition.image} alt={competition.title} />
              <p>{competition.description}</p>
              <p>{competition.url}</p>
              <p>{competition.date}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Competitions;
