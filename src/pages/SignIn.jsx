import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signInBg from "../assets/images/signinbg.jpg";
import bg1 from "../assets/images/bg1.png";

const SignIn = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // fetch user credentials from backend and validate
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      // console the received response
      console.log(res.ok);
      if (res.ok) {
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        setError("Invalid username or password");
      }
    });
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-full px-56"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center h-3/4 w-3/4 shadow-2xl rounded-lg bg-white overflow-hidden z-10">
        {/* blur the background */}
        <div className="w-2/5 h-2/3 my-auto px-6 py-10 backdrop-blur-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-black">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:shadow-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-black">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:shadow-md"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-yellow-700 p-2 rounded hover:bg-yellow-700 hover:text-black focus:outline-none hover:shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="relative w-3/5 h-full object-cover overflow-hidden rounded-[40px_0_0_40px] shadow-[5px_0_30px]">
          <div className="absolute inset-0 flex justify-center items-center">
            <h1
              className="text-5xl font-bold text-center text-transparent bg-clip-text px-10 py-2 rounded-lg transition-transform transform hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgb(255 190 0), #222222)",
              }}
            >
              WELCOME TO THE ADMIN PORTAL
            </h1>
          </div>
          <img
            src={signInBg}
            alt="Sign In"
            className="h-[800px] w-[800px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
