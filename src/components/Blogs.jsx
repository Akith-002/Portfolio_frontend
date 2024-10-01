import React, { useState, useEffect, useRef } from "react";
import "../styles/Blogs.css";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

// Fetching Blogs
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // To manage modal content
  const blogRefs = useRef([]); // To store refs of each blog card
  const blogHeadingRef = useRef(null); // Ref for the "Blogs" heading

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BackEnd_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Intersection Observer for appearing animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("blog-slide-in");
          } else {
            entry.target.classList.remove("blog-slide-in");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    blogRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (blogRefs.current) {
        blogRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, [blogs]);

  // Intersection Observer for heading animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("heading-appear");
          } else {
            entry.target.classList.remove("heading-appear");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (blogHeadingRef.current) {
      observer.observe(blogHeadingRef.current);
    }

    return () => {
      if (blogHeadingRef.current) {
        observer.unobserve(blogHeadingRef.current);
      }
    };
  }, []);

  // Listen for 'Escape' key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (selectedBlog) {
      // Add event listener when modal is open
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      // Remove event listener when modal is closed or component is unmounted
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedBlog]);

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
      className="h-auto px-4 sm:px-8 md:px-12 lg:px-24 pt-12 py-20 flex flex-col items-center bg-gray-600"
    >
      <h2
        ref={blogHeadingRef}
        className="text-4xl sm:text-5xl mb-12 opacity-0 transform translate-y-10 transition-opacity transition-transform duration-500 ease-in-out"
      >
        Blogs
      </h2>
      {loading ? <div>Loading Blogs...</div> : null}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 px-4">
        {blogs.map((blog, index) => (
          <div
            ref={(el) => (blogRefs.current[index] = el)}
            key={blog._id}
            className="flex flex-col justify-between bg-white h-[400px] md:h-[435px] rounded-lg shadow-lg p-4 sm:p-6 opacity-0 transform translate-y-10 transition-opacity transition-transform duration-500 ease-in-out hover:scale-105 "
          >
            <div className="mb-4 overflow-hidden rounded-md">
              {/* Display the uploaded image */}
              {blog.image ? (
                <img
                  src={`${BackEnd_URL}${blog.image}`}
                  loading="lazy"
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md"></div> // Placeholder
              )}
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-semibold leading-6 mb-2">
                {blog.title}
              </h3>
              {/* Limit the text length to 3 lines */}
              <p className="text-sm text-gray-700 line-clamp-3">
                {blog.content}
              </p>
            </div>

            <div className="w-full mt-4 transition-transform duration-300 transform hover:scale-105">
              <button
                onClick={() => openModal(blog)}
                className="bg-black text-white py-2 rounded-lg hover:text-yellow-500 w-full text-center"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center mx-2 bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-200 p-6 sm:p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 w-8 h-8 bg-gray-700 rounded-md text-yellow-800 font-extrabold text-center hover:text-black"
              onClick={closeModal}
            >
              X
            </button>
            <h3 className="w-8/9 text-xl sm:text-2xl font-semibold mb-4">
              {selectedBlog.title}
            </h3>
            {selectedBlog.image && (
              <img
                src={`${BackEnd_URL}${selectedBlog.image}`}
                loading="lazy"
                alt={selectedBlog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-700 mb-4">{selectedBlog.content}</p>

            {/* Add a link to the blog */}
            {selectedBlog.url && (
              <a
                href={selectedBlog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-800 text-black px-4 py-2 rounded-lg hover:underline"
              >
                Visit Blog
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
