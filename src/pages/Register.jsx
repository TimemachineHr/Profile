import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-[#007b5e]">
          Register
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-[#007b5e]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-[#007b5e]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#007b5e] text-white py-3 rounded-xl hover:bg-[#005f4e] transition duration-200"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#007b5e] hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
