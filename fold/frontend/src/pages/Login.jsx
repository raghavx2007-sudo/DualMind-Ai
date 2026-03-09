import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("https://dualmind-ai-xubm.onrender.com/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (err) {
      alert("Invalid credentials");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center
                    bg-white dark:bg-[#0f172a] transition-colors">

      <div className="w-full max-w-md
                      bg-white dark:bg-[#1e293b]
                      shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-center mb-6
                       text-gray-800 dark:text-white">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-[#0f172a]
                       text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                       text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}