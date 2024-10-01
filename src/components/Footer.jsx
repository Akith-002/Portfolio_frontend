import React, { useState } from "react";
import emailjs from "emailjs-com";
import bg from "/assets/images/footerBg.png";
import { motion } from "framer-motion"; // Import Framer Motion for animation

const userId = import.meta.env.VITE_EMAILJS_USER_ID;
console.log("User ID: ", userId);

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS send function
    emailjs
      .send(
        "service_sik26p6", // replace with your EmailJS Service ID
        "template_q1ibitu", // replace with your EmailJS Template ID
        formData, // form data being sent
        userId // replace with your EmailJS User ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send message, please try again.");
        }
      );

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <footer
      className="bg-gray-700 text-white pt-10 border-t-2 border-gray-800"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 px-4 md:px-8">
          {/*Quick links*/}
          <motion.div
            className="flex flex-col space-y-4 font-semibold"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">Follow</h3>
            <div className="flex flex-col gap-4 font-semibold">
              <a
                href="https://www.linkedin.com/in/akith-chandinu-14761a271/"
                className="hover:text-yellow-400 ml-2"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Akith-002"
                className="hover:text-yellow-400 ml-2"
              >
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
          </motion.div>

          {/* Contact Me Section */}
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">Contact Me</h3>
            <form
              className="flex flex-col space-y-4 ml-2"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-2 w-full text-black rounded-md focus:shadow-xl focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-2 w-full text-black rounded-md focus:shadow-xl focus:outline-none"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="p-2 w-full text-black rounded-md focus:shadow-xl focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white p-2 rounded-md hover:bg-yellow-500 hover:text-black focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-center items-center h-16 text-center mt-8 text-white border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} AKiNZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
