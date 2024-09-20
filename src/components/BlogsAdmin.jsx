import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState(null); // New state to store the selected image
  const [updateBlog, setUpdateBlog] = useState({
    id: "",
    title: "",
    content: "",
    image: null,
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
        const response = await fetch("http://localhost:5000/blogs");
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
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        body: formData, // Send form data instead of JSON
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const createdBlog = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      setNewBlog({ title: "", content: "", url: "" });
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
      const response = await fetch(
        `http://localhost:5000/blogs/${updateBlog.id}`,
        {
          method: "PATCH",
          body: formData, // Send form data instead of JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
      setUpdateBlog({ id: "", title: "", content: "", url: "", image: null });
      setIsEditModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/${deleteBlogId}`,
        {
          method: "DELETE",
        }
      );

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
        {/* create new icon */}
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
          <h3 className="text-xl font-bold mb-4">Create New Blog</h3>
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="mb-4 p-2 border"
          />
          <textarea
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            className="mb-4 p-2 border"
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Blog
          </button>
        </form>
      </Modal>

      {/* View Blog Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        {selectedBlog && (
          <>
            <h3 className="text-xl font-bold mb-4">{selectedBlog.title}</h3>
            <p className="mb-4">{selectedBlog.content}</p>
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
              className="bg-green-500 text-white p-2 rounded mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setDeleteBlogId(selectedBlog._id);
                setIsDeleteModalOpen(true);
                setIsViewModalOpen(false);
              }}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </Modal>

      {/* Edit Blog Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleUpdateBlog}>
          <h3 className="text-xl font-bold mb-4">Edit Blog</h3>
          <input
            type="text"
            placeholder="Title"
            value={updateBlog.title}
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, title: e.target.value })
            }
            className="mb-4 p-2 border"
          />
          <textarea
            placeholder="Content"
            value={updateBlog.content}
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, content: e.target.value })
            }
            className="mb-4 p-2 border"
          />
          <input
            type="file"
            onChange={(e) =>
              setUpdateBlog({ ...updateBlog, imageFile: e.target.files[0] })
            }
            className="mb-4"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Update Blog
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
        <button
          onClick={handleDeleteBlog}
          className="bg-red-500 text-white p-2 rounded mr-4"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default BlogsAdmin;
