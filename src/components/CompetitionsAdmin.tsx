import React, { useState, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

interface Competition {
  _id: string;
  title: string;
  description: string;
  url?: string;
  image?: string;
}

interface UpdateCompetition {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string | null;
  imageFile?: File | null;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg relative max-w-xl w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 hover:shadow-md hover:shadow-red-500 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const CompetitionsAdmin: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionLoading, setCompetitionLoading] = useState(true);
  const [newCompetition, setNewCompetition] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updatecompetition, setUpdateCompetition] = useState<UpdateCompetition>(
    {
      id: "",
      title: "",
      description: "",
      url: "",
      image: null,
    }
  );
  const [deleteCompetitionId, setDeleteCompetitionId] = useState("");
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch competitions
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/competitions`);
        const data = await response.json();
        setCompetitions(data);
        setCompetitionLoading(false);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  // Create a new competition
  const createCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newCompetition.title);
    formData.append("description", newCompetition.description);
    formData.append("url", newCompetition.url);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${BackEnd_URL}/competitions`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create competition");
      }

      const createdCompetition = await response.json();
      setCompetitions((prevCompetitions) => [
        ...prevCompetitions,
        createdCompetition,
      ]);
      setNewCompetition({ title: "", description: "", url: "", image: "" });
      setImageFile(null);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating competition:", error);
    }
  };

  // Update a competition
  const handleUpdateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatecompetition.id) {
      console.error("Please select a competition to update");
      return;
    }

    const formData = new FormData();
    formData.append("title", updatecompetition.title);
    formData.append("description", updatecompetition.description);
    formData.append("url", updatecompetition.url);
    if (updatecompetition.imageFile) {
      formData.append("image", updatecompetition.imageFile);
    }

    try {
      const response = await fetch(
        `${BackEnd_URL}/competitions/${updatecompetition.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update competition");
      }

      const updatedCompetition = await response.json();
      setCompetitions((prevCompetitions) =>
        prevCompetitions.map((competition) =>
          competition._id === updatedCompetition._id
            ? updatedCompetition
            : competition
        )
      );
      setUpdateCompetition({
        id: "",
        title: "",
        description: "",
        url: "",
        image: null,
      });
      setImageFile(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating competition:", error);
    }
  };

  // Delete a competition
  const handleDeleteCompetition = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deleteCompetitionId) {
      console.error("Please select a competition to delete");
      return;
    }

    try {
      const response = await fetch(
        `${BackEnd_URL}/competitions/${deleteCompetitionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete competition");
      }

      setCompetitions((prevCompetitions) =>
        prevCompetitions.filter(
          (competition) => competition._id !== deleteCompetitionId
        )
      );
      setDeleteCompetitionId("");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold ">Competitions</h2>
        <div
          className="w-32 h-10 rounded-md bg-gray-500 flex justify-center items-center hover:text-yellow-500 hover:bg-gray-700"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <p className="font-bold">Create</p>
          <PlusIcon className="w-6 h-6" />
        </div>
      </div>

      <ul className="space-y-4">
        {competitionLoading && <p>Loading competitions...</p>}
        {competitions.map((competition) => (
          <li key={competition._id} className="bg-gray-200 p-4 rounded-md">
            <h3
              className="text-xl font-semibold hover:underline"
              onClick={() => {
                setSelectedCompetition(competition);
                setIsViewModalOpen(true);
              }}
            >
              {competition.title}
            </h3>
            <p>{competition.description.slice(0, 100)}..</p>
          </li>
        ))}
      </ul>

      {/* Create Competition Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <form onSubmit={createCompetition}>
          <h3 className="text-2xl font-bold mb-4">Create New Competition</h3>
          <input
            type="text"
            placeholder="Title"
            value={newCompetition.title}
            onChange={(e) =>
              setNewCompetition({ ...newCompetition, title: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <textarea
            placeholder="Description"
            value={newCompetition.description}
            onChange={(e) =>
              setNewCompetition({
                ...newCompetition,
                description: e.target.value,
              })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <input
            type="text"
            placeholder="URL"
            value={newCompetition.url}
            onChange={(e) =>
              setNewCompetition({ ...newCompetition, url: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <div className="flex items-center gap-4 w-full mb-4 ml-2">
            <input
              id="file-input"
              type="file"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            <label
              htmlFor="file-input"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
            >
              Choose File
            </label>

            {imageFile && <p className="">Selected File: {imageFile.name}</p>}
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="bg-black text-white w-full p-2 rounded hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-400"
            >
              Create Competition
            </button>
          </div>
        </form>
      </Modal>

      {/* View Competition Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        {selectedCompetition && (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-4">
                {selectedCompetition.title}
                {selectedCompetition.url && (
                  <a
                    href={selectedCompetition.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-400 text-black px-2 py-1 ml-4 text-xs rounded rounded-lg hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </h1>
            </div>
            {selectedCompetition.image && (
              <img
                src={`${BackEnd_URL}${selectedCompetition.image}`}
                loading="lazy"
                alt={selectedCompetition.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <p className="mb-4">{selectedCompetition.description}</p>

            <div className="flex justify-evenly items-center pt-4">
              <button
                onClick={() => {
                  setUpdateCompetition({
                    id: selectedCompetition._id,
                    title: selectedCompetition.title,
                    description: selectedCompetition.description,
                    url: selectedCompetition.url || "",
                    image: selectedCompetition.image || null,
                  });
                  setIsEditModalOpen(true);
                  setIsViewModalOpen(false);
                }}
                className="bg-black w-1/3 text-white py-2 px-4 rounded hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-400"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteCompetitionId(selectedCompetition._id);
                  setIsDeleteModalOpen(true);
                  setIsViewModalOpen(false);
                }}
                className="bg-red-500 w-1/3 text-white py-2 px-4 rounded hover:text-black hover:shadow-md hover:shadow-red-400"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* Edit Competition Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h3 className="text-2xl font-bold mb-4">Edit Competition</h3>
        <form onSubmit={handleUpdateCompetition}>
          <input
            type="text"
            placeholder="Title"
            value={updatecompetition.title}
            onChange={(e) =>
              setUpdateCompetition({
                ...updatecompetition,
                title: e.target.value,
              })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <textarea
            placeholder="Description"
            value={updatecompetition.description}
            onChange={(e) =>
              setUpdateCompetition({
                ...updatecompetition,
                description: e.target.value,
              })
            }
            className="w-full h-52 p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />

          <input
            type="text"
            placeholder="URL"
            value={updatecompetition.url}
            onChange={(e) =>
              setUpdateCompetition({
                ...updatecompetition,
                url: e.target.value,
              })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />

          <div className="flex items-center gap-4 w-full mb-4 ml-2">
            <input
              id="file-input"
              type="file"
              onChange={(e) =>
                setUpdateCompetition({
                  ...updatecompetition,
                  imageFile: e.target.files?.[0] || null,
                })
              }
              className="hidden"
            />

            <label
              htmlFor="file-input"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
            >
              Choose File
            </label>

            {updatecompetition.image && (
              <p className="">Selected File: {updatecompetition.image}</p>
            )}
          </div>

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
        <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
        <p className="mx-4 text-center">
          Do you really want to delete this competition? This process cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-evenly">
          <button
            onClick={handleDeleteCompetition}
            className="bg-red-500 text-white w-1/3 py-2 px-4 rounded hover:shadow hover:shadow-red-500 hover:text-black"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white w-1/3 py-2 px-4 rounded hover:shadow hover:shadow-gray-500 hover:text-black hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CompetitionsAdmin;
