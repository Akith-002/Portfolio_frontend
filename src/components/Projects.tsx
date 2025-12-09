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
import { useProjects, Project } from "@/hooks/useApi";

const Projects: React.FC = () => {
  const { data: projects = [], isLoading, error } = useProjects();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleOpen = (project: Project) => setOpenProject(project);
  const handleClose = () => setOpenProject(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setScrollPosition(scrollPos);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollPosition]);

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

  if (error) {
    return (
      <section className="py-12 text-white text-center">
        <p>Error loading projects. Please try again later.</p>
      </section>
    );
  }

  return (
    <section
      className="pb-8 md:pb-12 pt-12 lg:pl-16 lg:pr-4 h-auto lg:h-full text-white flex flex-col gap-12 items-center"
      style={{
        background:
          "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
      }}
      id="projects"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold opacity-0 transform translate-y-10 duration-1000"
      >
        Projects
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 justify-around w-full px-4 lg:px-0">
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

        <div className="w-full lg:w-1/2 h-full px-4 lg:px-8 py-2">
          {isLoading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : (
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

                  {/* @ts-ignore - material-tailwind types */}
                  <Dialog
                    size="md"
                    open={!!openProject && openProject._id === project._id}
                    handler={handleClose}
                    className="px-6 py-6 max-h-screen overflow-y-auto"
                  >
                    {/* @ts-ignore - material-tailwind types */}
                    <DialogHeader className="font-bold text-yellow-600 text-2xl md:text-3xl underline">
                      {openProject?.name}
                    </DialogHeader>
                    {/* @ts-ignore - material-tailwind types */}
                    <DialogBody className="bg-gray-500 rounded-xl">
                      <h1 className="mb-4 text-gray-900">
                        {openProject?.description}
                      </h1>
                      <div className="bg-gray-600 rounded-xl px-5 py-3 text-black">
                        <p>
                          <span className="text-yellow-600">
                            Github link :{" "}
                          </span>
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
                    {/* @ts-ignore - material-tailwind types */}
                    <DialogFooter>
                      {/* @ts-ignore - material-tailwind types */}
                      <Button
                        color="red"
                        onClick={handleClose}
                        className="mr-1"
                      >
                        <span>Close</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
