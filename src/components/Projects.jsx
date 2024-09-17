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
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [updateProject, setUpdateProject] = useState({
    id: "",
    name: "",
    description: "",
    linkedIn: "",
    github: "",
  });
  const [deleteId, setDeleteId] = useState("");
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

  // Create new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({ name: "", description: "", linkedIn: "", github: "" });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Update existing project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${updateProject.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updateProject.name,
            description: updateProject.description,
            linkedIn: updateProject.linkedIn,
            github: updateProject.github,
          }),
        }
      );
      const data = await response.json();
      setProjects(
        projects.map((proj) => (proj._id === data._id ? data : proj))
      );
      setUpdateProject({
        id: "",
        name: "",
        description: "",
        linkedIn: "",
        github: "",
      });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Delete a project
  const handleDeleteProject = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/projects/${deleteId}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((proj) => proj._id !== deleteId));
      setDeleteId("");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY; // Get scroll position
      setScrollPosition(scrollPos);

      // Trigger animation when scrolling past 300px (adjust as needed)
      if (scrollPos > 650) {
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
          <img src={projImg2} alt="projects" className="h-full object-cover" />
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
                  size="lg"
                  open={!!openProject && openProject._id === project._id}
                  handler={handleClose}
                  className="px-10 py-6"
                >
                  <DialogHeader className="font-bold text-3xl">
                    {openProject?.name}
                  </DialogHeader>
                  <DialogBody>
                    <h1 className="mb-8 ml-4 w-8/9">
                      {" "}
                      {openProject?.description}
                    </h1>
                    <div className="rounded-xl bg-blue-gray-300 px-5 py-3 text-white">
                      <p>
                        Github link :{" "}
                        <span className="underline">{openProject?.github}</span>
                      </p>
                      <p>
                        Linkedin link :{" "}
                        <span className="underline">
                          {openProject?.linkedIn}
                        </span>
                      </p>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
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

          {/* Form to create new project */}
          {/* <h2>Create Project</h2>
          <form onSubmit={handleCreateProject}>
            <div>
              <label>Project Name:</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Project Description:</label>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
            </div>
            <div>
              <label>LinkedIn:</label>
              <input
                type="text"
                value={newProject.linkedIn}
                onChange={(e) =>
                  setNewProject({ ...newProject, linkedIn: e.target.value })
                }
              />
            </div>
            <div>
              <label>GitHub:</label>
              <input
                type="text"
                value={newProject.github}
                onChange={(e) =>
                  setNewProject({ ...newProject, github: e.target.value })
                }
              />
            </div>
            <button type="submit">Create Project</button>
          </form> */}

          {/* Form to update project */}
          {/* <h2>Update Project</h2>
          <form onSubmit={handleUpdateProject} className="text-black">
            <div>
              <label>Select Project:</label>
              <select
                value={updateProject.id}
                onChange={(e) =>
                  setUpdateProject({ ...updateProject, id: e.target.value })
                }
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Project Name:</label>
              <input
                type="text"
                value={updateProject.name}
                onChange={(e) =>
                  setUpdateProject({ ...updateProject, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Project Description:</label>
              <textarea
                value={updateProject.description}
                onChange={(e) =>
                  setUpdateProject({
                    ...updateProject,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>LinkedIn:</label>
              <input
                type="text"
                value={updateProject.linkedIn}
                onChange={(e) =>
                  setUpdateProject({
                    ...updateProject,
                    linkedIn: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>GitHub:</label>
              <input
                type="text"
                value={updateProject.github}
                onChange={(e) =>
                  setUpdateProject({ ...updateProject, github: e.target.value })
                }
              />
            </div>
            <button type="submit">Update Project</button>
          </form> */}

          {/* Form to delete project */}
          {/* <h2>Delete Project</h2>
          <form onSubmit={handleDeleteProject} className="text-black">
            <div>
              <label>Select Project:</label>
              <select
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Delete Project</button>
          </form> */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
