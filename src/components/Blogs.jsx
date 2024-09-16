import React, { useState, useEffect } from "react";

// Fetching Blogs
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState(null); // New state to store the selected image
  const [updateBlog, setUpdateBlog] = useState({
    id: "",
    title: "",
    content: "",
    image: null,
  });
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null); // To manage modal content

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs");
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
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
      setNewBlog({ title: "", content: "" });
      setImageFile(null); // Clear the image state
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
      setUpdateBlog({ id: "", title: "", content: "", image: null });
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
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Function to open modal
  const openModal = (blog) => {
    setSelectedBlog(blog);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <section
      id="blogs"
      className="h-5/6 px-24 py-8 flex flex-col items-center "
    >
      {loading ? <div>Loading Blogs...</div> : null}
      <h2 className="text-5xl mb-8">Blogs</h2>
      <div className="w-full grid grid-cols-4 gap-x-12 gap-y-6 px-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className=" bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="mb-4">
              {/* Display the uploaded image */}
              {blog.image ? (
                <img
                  src={`http://localhost:5000${blog.image}`} // Image path
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md"></div> // Placeholder
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {blog.content.slice(0, 100)}...
            </p>
            <button
              onClick={() => openModal(blog)}
              className="text-blue-500 hover:underline"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <h3 className="text-2xl font-semibold mb-4">
              {selectedBlog.title}
            </h3>
            <p className="text-gray-700 mb-4">{selectedBlog.content}</p>
          </div>
        </div>
      )}

      {/* Create Blog Form */}
      {/* <form onSubmit={createBlog} encType="multipart/form-data">
        <h2>Create Blog</h2>
        <input
          type="text"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          placeholder="Blog Title"
        />
        <textarea
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          placeholder="Blog Content"
        />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])} // Handle image file selection
        />
        <button type="submit">Create Blog</button>
      </form> */}

      {/* Update Blog Form */}
      {/* <form onSubmit={handleUpdateBlog} encType="multipart/form-data">
        <h2>Update Blog</h2>
        <select
          value={updateBlog.id}
          onChange={(e) => setUpdateBlog({ ...updateBlog, id: e.target.value })}
        >
          <option value="">Select Blog</option>
          {blogs.map((blog) => (
            <option key={blog._id} value={blog._id}>
              {blog.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={updateBlog.title}
          onChange={(e) =>
            setUpdateBlog({ ...updateBlog, title: e.target.value })
          }
          placeholder="Blog Title"
        />
        <textarea
          value={updateBlog.content}
          onChange={(e) =>
            setUpdateBlog({ ...updateBlog, content: e.target.value })
          }
          placeholder="Blog Content"
        />
        <input
          type="file"
          onChange={(e) =>
            setUpdateBlog({ ...updateBlog, imageFile: e.target.files[0] })
          } // Handle image file selection for updating
        />
        <button type="submit">Update Blog</button>
      </form> */}

      {/* Delete Blog Form */}
      {/* <form onSubmit={handleDeleteBlog}>
        <h2>Delete Blog</h2>
        <select
          value={deleteBlogId}
          onChange={(e) => setDeleteBlogId(e.target.value)}
        >
          <option value="">Select Blog</option>
          {blogs.map((blog) => (
            <option key={blog._id} value={blog._id}>
              {blog.title}
            </option>
          ))}
        </select>
        <button type="submit">Delete Blog</button>
      </form> */}
    </section>
  );
};

export default Blogs;
