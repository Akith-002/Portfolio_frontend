import React from "react";
import bg from "../assets/images/footerBg.png";

const Footer = () => {
  return (
    <footer
      className="bg-gray-700 text-white pt-10 border-t-2 border-gray-800"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* blur the background */}
      <div className="container mx-auto px-4 ">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
          {/*Quick links*/}
          <div className="flex flex-col space-y-4 font-semibold ">
            <h3 className="text-xl">Quick Links</h3>
            <a href="#" className="hover:text-yellow-400 ml-2">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400 ml-2">
              About
            </a>
            <a href="#tech" className="hover:text-yellow-400 ml-2">
              Technologies
            </a>
            <a href="#projects" className="hover:text-yellow-400 ml-2">
              Projects
            </a>
            <a href="#blogs" className="hover:text-yellow-400 ml-2">
              Blogs
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Follow</h3>
            <div className="flex flex-col gap-4 font-semibold">
              <a
                href="https://www.linkedin.com/in/akith-chandinu-14761a271/"
                className="hover:text-yellow-400 ml-2"
              >
                LinkedIn
              </a>
              <a href="" className="hover:text-yellow-400 ml-2">
                GitHub
              </a>
              <a
                href="https://www.instagram.com/_akith_002/"
                className="hover:text-yellow-400 ml-2"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/akith.chandinu/"
                className="hover:text-yellow-400 ml-2"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@akithchandinu6602"
                className="hover:text-yellow-400 ml-2"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Email Subscribe */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold ">
              Subscribe to Our Newsletter
            </h3>
            <p className="ml-4">Get updates right to your inbox!</p>
            <form className="flex flex-col md:flex-row md:items-center ml-4">
              <input
                type="email"
                className="p-2 w-full md:w-auto md:flex-grow text-black rounded-l-md focus:shadow-xl focus:outline-none"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white p-2 rounded-r-md hover:bg-yellow-500 hover:text-black focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-center items-center h-16 text-center mt-8 text-white border-t border-t-2 border-gray-800">
          <p>&copy; {new Date().getFullYear()} AKiNZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
