import React, { useEffect, useState, useRef } from "react";
import projImg2 from "/assets/images/projects_img2.jpg";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const [openProject, setOpenProject] = useState(null); // Track which project’s modal is open
  const headingRef = useRef(null); // Ref for the "Projects" heading

  const handleOpen = (project) => setOpenProject(project);
  const handleClose = () => setOpenProject(null);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY; // Get scroll position
      setScrollPosition(scrollPos);
      if (scrollPos > 2700) {
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

  // IntersectionObserver for heading animation
  useEffect(() => {
    const observer = new IntersectionObserver(
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
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <section
      className="pb-8 md:pb-12 pt-12 lg:pl-16 lg:pr-4 h-auto lg:h-full text-white flex flex-col gap-12 items-center"
      style={{
        background:
          "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
      }}
      id="projects"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold opacity-0 transform translate-y-10 duration-1000"
      >
        Projects
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 justify-around w-full px-4 lg:px-0">
        {/* Project Image */}
        <div className="w-full lg:w-1/2 h-full px-2">
          <div className="h-[200px] md:h-[400px] lg:h-[500px] lg:my-10 rounded-lg overflow-hidden shadow-[0px_0px_14px_2px] shadow-yellow-500">
            <img
              src={projImg2}
              loading="lazy"
              alt="projects"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Project List */}
        <div className="w-full lg:w-1/2 h-full px-4 lg:px-8 py-2">
          <ul className="flex flex-col">
            {projects.map((project) => (
              <li
                key={project._id}
                className="flex justify-between my-4 md:my-5 pb-6 border-b border-gray-700 h-auto"
              >
                <div className="w-6/7 flex items-center">
                  <h3
                    className="text-xl md:text-2xl hover:text-yellow-500 hover:underline cursor-pointer"
                    onClick={() => handleOpen(project)}
                  >
                    {project.name}
                  </h3>
                </div>
                <div className="w-1/7 flex justify-center items-center">
                  <ArrowUpRightIcon
                    className="w-6 h-6 md:w-8 md:h-8 hover:text-yellow-500 cursor-pointer"
                    onClick={() => handleOpen(project)}
                    style={{ strokeWidth: 2.5 }}
                  />
                </div>

                {/* Modal for project details */}
                <Dialog
                  size="md"
                  open={!!openProject && openProject._id === project._id}
                  handler={handleClose}
                  className="px-6 py-6 max-h-screen overflow-y-auto "
                >
                  <DialogHeader className="font-bold text-yellow-600 text-2xl md:text-3xl underline">
                    {openProject?.name}
                  </DialogHeader>
                  <DialogBody className="bg-gray-400 rounded-xl">
                    <h1 className="mb-4 text-black">
                      {openProject?.description}
                    </h1>
                    <div className="bg-gray-800 rounded-xl px-5 py-3 text-black">
                      <p>
                        <span className="text-yellow-600">Github link : </span>
                        <span className="underline text-white hover:text-gray-500 break-words">
                          {openProject?.github}
                        </span>
                      </p>
                      <p>
                        <span className="text-yellow-600">
                          LinkedIn link :{" "}
                        </span>
                        <span className="underline text-white hover:text-gray-500 break-words">
                          {openProject?.linkedIn}
                        </span>
                      </p>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button color="red" onClick={handleClose} className="mr-1">
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
