import React, { useState } from "react";
import ProjectsAdmin from "../components/ProjectsAdmin";
import BlogsAdmin from "../components/BlogsAdmin";
import CompetitionsAdmin from "../components/CompetitionsAdmin";
import bg1 from "/assets/images/bg1.png";

const AdminPage = () => {
  // State to control which section is active
  const [activeTab, setActiveTab] = useState("projects");

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="flex flex-col items-center h-full min-h-screen bg-gray-100 p-4 sm:p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
        Welcome to the Admin Page
      </h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <button
          className={`p-2 px-4 font-semibold ${
            activeTab === "projects"
              ? "bg-black text-yellow-500"
              : "bg-gray-800 text-white"
          } rounded-md hover:bg-black hover:text-yellow-500 w-full sm:w-auto`}
          onClick={() => handleTabClick("projects")}
        >
          Projects
        </button>
        <button
          className={`p-2 px-4 font-semibold ${
            activeTab === "blogs"
              ? "bg-black text-yellow-500"
              : "bg-gray-800 text-white"
          } rounded-md hover:bg-black hover:text-yellow-500 w-full sm:w-auto`}
          onClick={() => handleTabClick("blogs")}
        >
          Blogs
        </button>
        <button
          className={`p-2 px-4 font-semibold ${
            activeTab === "competitions"
              ? "bg-black text-yellow-500"
              : "bg-gray-800 text-white"
          } rounded-md hover:bg-black hover:text-yellow-500 w-full sm:w-auto`}
          onClick={() => handleTabClick("competitions")}
        >
          Competitions
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-full sm:max-w-4xl">
        {/* Projects Section */}
        {activeTab === "projects" && <ProjectsAdmin />}

        {/* Blogs Section */}
        {activeTab === "blogs" && <BlogsAdmin />}

        {/* Competitions Section */}
        {activeTab === "competitions" && <CompetitionsAdmin />}
      </div>
    </div>
  );
};

export default AdminPage;
