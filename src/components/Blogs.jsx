import React, { useState, useEffect } from "react";

// Fetching Blogs
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [updateBlog, setUpdateBlog] = useState({
    id: "",
    title: "",
    content: "",
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
    try {
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const createdBlog = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      setNewBlog({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Update a blog
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/${updateBlog.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updateBlog.title,
            content: updateBlog.content,
          }),
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
      setUpdateBlog({ id: "", title: "", content: "" });
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
      className="h-5/6 px-20 py-8 flex flex-col items-center "
    >
      {loading ? <div>Loading Blogs...</div> : null}
      <h2 className="text-5xl mb-8">Blogs</h2>
      <div className="w-full flex flex-wrap justify-between gap-y-12">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-1/5 bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="mb-4">
              {/* Placeholder image */}
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
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
      <form onSubmit={createBlog}>
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
        <button type="submit">Create Blog</button>
      </form>

      {/* Update Blog Form */}
      {/* <form onSubmit={handleUpdateBlog}>
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
          placeholder="New Title"
        />
        <textarea
          value={updateBlog.content}
          onChange={(e) =>
            setUpdateBlog({ ...updateBlog, content: e.target.value })
          }
          placeholder="New Content"
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
