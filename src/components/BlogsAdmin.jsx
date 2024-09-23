import React, { useState, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
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

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    url: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null); // New state to store the selected image
  const [updateBlog, setUpdateBlog] = useState({
    id: "",
    title: "",
    content: "",
    image: null,
    url: "",
  });
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
        setBlogLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Create a new blog
  const createBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("image", imageFile); // Append the image file to the form data
    formData.append("url", newBlog.url); // Append the url to the form data

    try {
      const response = await fetch(`${BackEnd_URL}/blogs`, {
        method: "POST",
        body: formData, // Send form data instead of JSON
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const createdBlog = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      setNewBlog({ title: "", content: "", url: "", image: "" });
      setImageFile(null); // Clear the image state
      setIsCreateModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Update a blog
  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (!updateBlog.id) {
      console.error("Please select a blog to update");
      return;
    }

    const formData = new FormData();
    formData.append("title", updateBlog.title);
    formData.append("content", updateBlog.content);
    formData.append("url", updateBlog.url); // Correct url field
    if (updateBlog.imageFile) {
      formData.append("image", updateBlog.imageFile); // Correct image field
    }

    try {
      const response = await fetch(`${BackEnd_URL}/blogs/${updateBlog.id}`, {
        method: "PATCH",
        body: formData, // Send form data instead of JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
      setUpdateBlog({ id: "", title: "", content: "", url: "" });
      setImageFile(null); // Clear the image state
      setIsEditModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (e) => {
    e.preventDefault();

    if (!deleteBlogId) {
      console.error("Please select a blog to delete");
      return;
    }

    try {
      const response = await fetch(`${BackEnd_URL}/blogs/${deleteBlogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== deleteBlogId)
      );
      setDeleteBlogId("");
      setIsDeleteModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold ">Blogs</h2>
        <div
          className="w-32 h-10 rounded-md bg-gray-500 flex justify-center items-center hover:text-yellow-500 hover:bg-gray-700"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <p className="font-bold">Create</p>
          <PlusIcon className="w-6 h-6" />
        </div>
      </div>

      <ul className="space-y-4">
        {blogLoading ? <span>Loading Blogs...</span> : null}
        {blogs.map((blog) => (
          <li key={blog._id} className="bg-gray-200 p-4 rounded-md">
            <h3
              className="text-xl font-semibold hover:underline"
              onClick={() => {
                setSelectedBlog(blog);
                setIsViewModalOpen(true);
              }}
            >
              {blog.title}
            </h3>
            <p>{blog.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>

      {/* Create Blog Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <form onSubmit={createBlog}>
          <h3 className="text-2xl font-bold mb-4">Create New Blog</h3>
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <textarea
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <input
            type="text"
            placeholder="URL"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
          />
          <div className="flex items-center gap-4 w-full mb-4 ml-2">
            {/* Hidden file input */}
            <input
              id="file-input"
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden"
            />

            {/* Custom styled button */}
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
              Create Blog
            </button>
          </div>
        </form>
      </Modal>

      {/* View Blog Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        {selectedBlog && (
          <>
            <div>
              <h1 className="text-2xl w-5/6 font-bold mb-4">
                {selectedBlog.title}
                {selectedBlog.url && (
                  <a
                    href={selectedBlog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-400 text-black px-2 py-1 ml-4 text-xs rounded rounded-lg hover:underline"
                  >
                    Visit Blog
                  </a>
                )}
              </h1>
            </div>
            {selectedBlog.image && (
              <img
                src={`${BackEnd_URL}${selectedBlog.image}`}
                loading="lazy"
                alt={selectedBlog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <p className="mb-4">{selectedBlog.content}</p>

            <div className="flex justify-evenly items-center pt-4">
              <button
                onClick={() => {
                  setUpdateBlog({
                    id: selectedBlog._id,
                    title: selectedBlog.title,
                    content: selectedBlog.content,
                    url: selectedBlog.url,
                    image: selectedBlog.image,
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
                  setDeleteBlogId(selectedBlog._id);
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

      {/* Edit Blog Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h3 className="text-2xl font-bold mb-4">Edit Blog</h3>
        <form onSubmit={handleUpdateBlog}>
          <input
            type="text"
            placeholder="Title"
            value={updateBlog.title}
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, title: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />
          <textarea
            placeholder="Content"
            value={updateBlog.content}
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, content: e.target.value })
            }
            className="w-full h-52 p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />

          <input
            type="text"
            placeholder="URL"
            value={updateBlog.url}
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, url: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:shadow-md"
            required
          />

          <div className="flex items-center gap-4 w-full mb-4 ml-2">
            {/* Hidden file input */}
            <input
              id="file-input"
              type="file"
              onChange={(e) =>
                setUpdateBlog({ ...updateBlog, imageFile: e.target.files[0] })
              }
              className="hidden"
            />

            {/* Custom styled button */}
            <label
              htmlFor="file-input"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
            >
              Choose File
            </label>

            {updateBlog.image && (
              <p className="">Selected File: {updateBlog.image}</p>
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
          Do you really want to delete this project? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-evenly">
          <button
            onClick={handleDeleteBlog}
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

export default BlogsAdmin;
