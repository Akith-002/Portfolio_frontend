import React, { useEffect, useState } from "react";
import projImg2 from "../assets/images/projects_img2.jpg";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

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

  return (
    <div
      className="py-12 h-screen text-white flex flex-col gap-12 items-center"
      style={{
        background:
          "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
      }}
      id="projects"
    >
      <h2 className="text-4xl">Projects</h2>
      <div className="flex justify-around w-4/5">
        <div className="w-2/5 h-full object-cover rounded-lg overflow-hidden shadow-[0px_0px_20px_1px] shadow-gray-700 ">
          <img src={projImg2} alt="projects" className="h-96" />
        </div>
        <div className="w-2/5 px-8">
          <ul className="flex flex-col">
            {projects.map((project) => (
              <li key={project._id} className="flex justify-between my-6">
                <h3>{project.name}</h3>
                <ArrowUpRightIcon className="w-6 h-6" />
                {/* <p>{project.description}</p>
                <p>{project.linkedIn}</p>
                <p>{project.github}</p> */}
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
      <form onSubmit={handleUpdateProject}>
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
              setUpdateProject({ ...updateProject, linkedIn: e.target.value })
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
      <form onSubmit={handleDeleteProject}>
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
    </div>
  );
};

export default Projects;
