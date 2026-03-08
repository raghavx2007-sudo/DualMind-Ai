import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        bg-gradient-to-br from-[#1e293b] to-[#111827]
        rounded-2xl
        p-6
        border border-gray-800
        shadow-lg
        hover:shadow-purple-500/10
        transition-all duration-300
      "
    >
      {children}
    </motion.div>
  );
}