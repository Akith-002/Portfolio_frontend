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

  return (
    <div>
      {loading ? <div>Loading Blogs...</div> : null}
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>

      {/* Create Blog Form */}
      {/* <form onSubmit={createBlog}>
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
      </form> */}

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
    </div>
  );
};

export default Blogs;
