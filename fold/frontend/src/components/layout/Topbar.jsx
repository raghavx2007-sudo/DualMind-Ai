import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-6 py-4 
                 bg-white dark:bg-[#0f172a]
                 border-b border-gray-200 dark:border-gray-700
                 flex justify-end items-center
                 transition-colors duration-300"
    >
      <button
        onClick={handleLogout}
        className="p-2 rounded-full 
                   hover:bg-gray-200 dark:hover:bg-[#1e293b]
                   transition"
      >
        <FiLogOut className="text-xl text-gray-700 dark:text-gray-300" />
      </button>
    </motion.div>
  );
}