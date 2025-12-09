import React, { useState, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

interface Project {
  _id: string;
  name: string;
  description: string;
  linkedIn?: string;
  github?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center shadow-lg">
      <div className="relative bg-white py-10 px-8 rounded-lg shadow-md max-w-xl w-full">
        <button
          className="absolute right-3 top-3 bg-gray-500 text-white py-2 px-4 rounded hover:bg-red-600 hover:shadow-md hover:shadow-red-500 hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ProjectsAdmin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectLoading, setProjectLoading] = useState(true);

  // States for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // New Project State
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    linkedIn: "",
    github: "",
  });

  // Selected Project State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState("");

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/projects`);
        const data = await response.json();
        setProjects(data);
        setProjectLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Create new project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BackEnd_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({ name: "", description: "", linkedIn: "", github: "" });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Update existing project
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      const response = await fetch(
        `${BackEnd_URL}/projects/${selectedProject._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedProject),
        }
      );
      const data = await response.json();
      setProjects(
        projects.map((proj) => (proj._id === data._id ? data : proj))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Delete a project
  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${BackEnd_URL}/projects/${deleteId}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((proj) => proj._id !== deleteId));
      setDeleteId("");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold ">Projects</h2>
        {/* create new icon */}
        <div
          className="w-32 h-10 rounded-md bg-gray-500 flex justify-center items-center hover:text-yellow-500 hover:bg-black cursor-pointer"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <p className="font-bold">Create</p>
          <PlusIcon className="w-6 h-6" />
        </div>
      </div>

      {/* loading */}
      {projectLoading ? <span>Loading projects...</span> : null}

      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project._id}
            className="bg-gray-200 p-4 rounded-md hover:bg-gray-400 cursor-pointer"
          >
            <h3
              className="text-xl font-semibold hover:underline"
              onClick={() => {
                setSelectedProject(project);
                setIsViewModalOpen(true);
              }}
            >
              {project.name}
            </h3>
            <p>{project.description.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <form onSubmit={handleCreateProject}>
          <h2 className="text-xl font-bold mb-4">Create New Project</h2>
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            placeholder="Project Name"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="Project Description"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <input
            type="text"
            value={newProject.linkedIn}
            onChange={(e) =>
              setNewProject({ ...newProject, linkedIn: e.target.value })
            }
            placeholder="LinkedIn Link"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <input
            type="text"
            value={newProject.github}
            onChange={(e) =>
              setNewProject({ ...newProject, github: e.target.value })
            }
            placeholder="Github Link"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />

          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-400"
          >
            Create Project
          </button>
        </form>
      </Modal>

      {/* View/Edit Project Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 w-5/6">
          {selectedProject?.name}
        </h2>
        <div className="bg-gray-300 p-4 rounded-md">
          <p className="mb-4">{selectedProject?.description}</p>
          <div className="p-2 rounded-md bg-gray-100">
            <p>
              LinkedIn:{" "}
              <a href={selectedProject?.linkedIn} className="underline">
                {selectedProject?.linkedIn}
              </a>
            </p>
            <p>
              Github:{" "}
              <a href={selectedProject?.github} className="underline">
                {selectedProject?.github}
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-evenly items-center pt-4">
          <button
            className="bg-black w-1/3 text-white py-2 px-4 rounded hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-400"
            onClick={() => {
              setIsEditModalOpen(true);
              setIsViewModalOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 w-1/3 text-white py-2 px-4 rounded hover:text-black hover:shadow-md hover:shadow-red-400"
            onClick={() => {
              if (selectedProject) {
                setDeleteId(selectedProject._id);
                setIsDeleteModalOpen(true);
                setIsViewModalOpen(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Edit Project Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleUpdateProject}>
          <input
            type="text"
            value={selectedProject?.name || ""}
            onChange={(e) =>
              setSelectedProject(
                selectedProject
                  ? { ...selectedProject, name: e.target.value }
                  : null
              )
            }
            placeholder="Project Name"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <textarea
            value={selectedProject?.description || ""}
            onChange={(e) =>
              setSelectedProject(
                selectedProject
                  ? { ...selectedProject, description: e.target.value }
                  : null
              )
            }
            placeholder="Project Description"
            className="w-full h-52 p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <input
            type="text"
            value={selectedProject?.linkedIn || ""}
            onChange={(e) =>
              setSelectedProject(
                selectedProject
                  ? { ...selectedProject, linkedIn: e.target.value }
                  : null
              )
            }
            placeholder="LinkedIn Link"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <input
            type="text"
            value={selectedProject?.github || ""}
            onChange={(e) =>
              setSelectedProject(
                selectedProject
                  ? { ...selectedProject, github: e.target.value }
                  : null
              )
            }
            placeholder="Github Link"
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-400"
          >
            Save Changes
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p>
          Do you really want to delete this project? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-evenly">
          <button
            className="bg-red-500 text-white w-1/3 py-2 px-4 rounded hover:shadow hover:shadow-red-500 hover:text-black"
            onClick={handleDeleteProject}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white w-1/3 py-2 px-4 rounded hover:shadow hover:shadow-gray-500 hover:text-black hover:bg-gray-600"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsAdmin;
