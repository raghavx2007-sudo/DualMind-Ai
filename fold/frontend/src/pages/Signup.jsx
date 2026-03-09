import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post("https://dualmind-ai-xubm.onrender.com/api/auth/signup",{
        name,
        email,
        password
      });

      alert("Account created");

      navigate("/login");

    } catch(err){

      console.log("FULL ERROR:", err);
      console.log("SERVER RESPONSE:", err.response?.data);
    
      alert(err.response?.data?.message || "Registration failed");
    
    }

  };

  return(

    <div className="min-h-screen flex items-center justify-center
                    bg-white dark:bg-[#0f172a] transition-colors">

      <div className="w-full max-w-md
                      bg-white dark:bg-[#1e293b]
                      shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-center mb-6
                       text-gray-800 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-[#0f172a]
                       text-black dark:text-white"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-[#0f172a]
                       text-black dark:text-white"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-[#0f172a]
                       text-black dark:text-white"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full p-3 rounded-lg
                       bg-indigo-600 text-white
                       hover:bg-indigo-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}