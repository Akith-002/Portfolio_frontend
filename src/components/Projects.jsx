import React, { useEffect, useState } from "react";
import projImg2 from "../assets/images/projects_img2.jpg";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  const [openProject, setOpenProject] = useState(null); // Track which project’s modal is open

  const handleOpen = (project) => setOpenProject(project);

  const handleClose = () => setOpenProject(null);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/projects");
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
      if (scrollPos > 1500) {
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
      className="pb-8 pt-12 h-screen text-white flex flex-col gap-12 items-center"
      style={{
        background:
          "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
      }}
      id="projects"
    >
      <h2
        className={`text-5xl transition-transform duration-[900ms] ${
          isVisible
            ? "transform scale-100 opacity-100"
            : "transform scale-0 opacity-0"
        }`}
      >
        Projects
      </h2>

      <div className="flex gap-8 justify-around w-5/6">
        <div
          className={`w-1/2 h-8/9 my-auto mx-4 rounded-lg overflow-hidden shadow-[0px_0px_20px_1px] shadow-gray-700 transition-transform duration-[1500ms] ${
            isVisible
              ? "transform translate-x-0 opacity-100"
              : "transform -translate-x-40 opacity-0"
          } `}
        >
          <img
            src={projImg2}
            loading="lazy"
            alt="projects"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 h-full px-8">
          <ul className="flex flex-col">
            {projects.map((project) => (
              <li
                key={project._id}
                className="flex justify-between my-6 pb-2 px-6 border-b border-gray-700 h-14"
              >
                <div className="w-5/6 flex items-center">
                  <h3 className="text-2xl">{project.name}</h3>
                </div>
                <div className="w-1/6 flex justify-center items-center">
                  <ArrowUpRightIcon
                    className="w-8 h-8 hover:text-yellow-500"
                    onClick={() => handleOpen(project)}
                    style={{
                      strokeWidth: 2.5,
                    }}
                  />
                </div>
                <Dialog
                  size="md"
                  open={!!openProject && openProject._id === project._id}
                  handler={handleClose}
                  className="px-10 py-6"
                >
                  <DialogHeader className="font-bold text-blue-600 text-3xl underline">
                    {openProject?.name}
                  </DialogHeader>
                  <DialogBody className="bg-gray-300 rounded-xl">
                    <h1 className="mb-8 ml-4 w-8/9 text-gray-800">
                      {" "}
                      {openProject?.description}
                    </h1>
                    <div className="bg-gray-100 rounded-xl px-5 py-3 text-black">
                      <p>
                        <span className="text-blue-500">Github link : </span>
                        <span className="underline hover:text-gray-700">
                          {openProject?.github}
                        </span>
                      </p>
                      <p>
                        <span className="text-blue-500">Linkedin link :</span>{" "}
                        <span className="underline hover:text-gray-700">
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
