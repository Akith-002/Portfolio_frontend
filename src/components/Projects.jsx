import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [updateProject, setUpdateProject] = useState({
    id: "",
    name: "",
    description: "",
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
      setNewProject({ name: "", description: "" });
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
          }),
        }
      );
      const data = await response.json();
      setProjects(
        projects.map((proj) => (proj._id === data._id ? data : proj))
      );
      setUpdateProject({ id: "", name: "", description: "" });
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
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
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
  );
};

export default Projects;
