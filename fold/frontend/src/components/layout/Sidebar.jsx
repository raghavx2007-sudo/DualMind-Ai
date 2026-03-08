import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaTasks,
  FaBell,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/" },
    { name: "Learning Agent", icon: <FaBook />, path: "/learning" },
    { name: "Personal AI", icon: <FaRobot />, path: "/ai" },
    { name: "Tasks", icon: <FaTasks />, path: "/tasks" },
    { name: "Reminders", icon: <FaBell />, path: "/reminders" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#111827] to-[#0f172a] p-6 fixed border-r border-gray-800">
      <h1 className="text-2xl font-bold mb-10 text-purple-400">
        DualMind AI
      </h1>

      <nav className="space-y-3 text-gray-300">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-purple-600/20 text-purple-400 shadow-md shadow-purple-500/20"
                      : "hover:text-purple-400 hover:bg-[#1f2937]"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
}