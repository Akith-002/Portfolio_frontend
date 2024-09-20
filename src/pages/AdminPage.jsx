import React, { useState, useEffect } from "react";
import ProjectsAdmin from "../components/ProjectsAdmin";
import BlogsAdmin from "../components/BlogsAdmin";
import bg1 from "../assets/images/bg1.png";

const AdminPage = () => {
  // State to control which section is active
  const [activeTab, setActiveTab] = useState("projects");

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="flex flex-col items-center h-full min-h-screen bg-gray-100 p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Welcome to the Admin Page</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`p-2 px-4 font-semibold ${
            activeTab === "projects"
              ? "bg-black text-yellow-500"
              : "bg-gray-800 text-white"
          } rounded-md hover:bg-black hover:text-yellow-500`}
          onClick={() => handleTabClick("projects")}
        >
          Projects
        </button>
        <button
          className={`p-2 px-4 font-semibold ${
            activeTab === "blogs"
              ? "bg-black text-yellow-500"
              : "bg-gray-800 text-white"
          } rounded-md hover:bg-black hover:text-yellow-500`}
          onClick={() => handleTabClick("blogs")}
        >
          Blogs
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl">
        {/* Projects Section */}
        {activeTab === "projects" && <ProjectsAdmin />}

        {/* Blogs Section */}
        {activeTab === "blogs" && <BlogsAdmin />}
      </div>
    </div>
  );
};

export default AdminPage;
