import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [accent, setAccent] = useState("blue");
  const [voiceSpeed, setVoiceSpeed] = useState(1);

  // Load saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAccent = localStorage.getItem("accent");
    const savedSpeed = localStorage.getItem("voiceSpeed");

    setDarkMode(savedTheme !== "light");
    if (savedAccent) setAccent(savedAccent);
    if (savedSpeed) setVoiceSpeed(Number(savedSpeed));
  }, []);

  // Apply theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Apply accent color
  const changeAccent = (color) => {
    setAccent(color);
    localStorage.setItem("accent", color);
  };

  // Apply voice speed
  const changeVoiceSpeed = (e) => {
    setVoiceSpeed(e.target.value);
    localStorage.setItem("voiceSpeed", e.target.value);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings ⚙️</h1>

        {/* Dark Mode */}
        <div className="bg-gray-100 dark:bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>

          <div className="flex items-center justify-between">
            <span>Dark Mode</span>

            <button
              onClick={toggleTheme}
              className={`w-16 h-8 flex items-center rounded-full p-1 transition ${
                darkMode ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <motion.div
                layout
                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
              >
                {darkMode ? (
                  <FaMoon className="text-black text-xs" />
                ) : (
                  <FaSun className="text-yellow-500 text-xs" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="bg-gray-100 dark:bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Accent Color</h2>

          <div className="flex gap-4">
            {["blue", "purple", "green", "red"].map((color) => (
              <button
                key={color}
                onClick={() => changeAccent(color)}
                className={`w-10 h-10 rounded-full ${
                  color === "blue" && "bg-blue-500"
                } ${color === "purple" && "bg-purple-500"} ${
                  color === "green" && "bg-green-500"
                } ${color === "red" && "bg-red-500"} ${
                  accent === color ? "ring-4 ring-white" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Voice Speed */}
        <div className="bg-gray-100 dark:bg-[#1e293b] p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Voice Speed</h2>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={voiceSpeed}
            onChange={changeVoiceSpeed}
            className="w-full"
          />

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Current Speed: {voiceSpeed}x
          </p>
        </div>
      </div>
    </Layout>
  );
}