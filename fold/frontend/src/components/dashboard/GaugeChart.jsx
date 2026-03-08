import { motion } from "framer-motion";

export default function GaugeChart({ value = 0, color = "#22c55e" }) {

  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative w-40 h-40 flex items-center justify-center"
      style={{
        boxShadow: `0 0 40px ${color}25`,
        borderRadius: "9999px",
      }}
    >

      {/* Background Circle */}
      <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>

      {/* Progress Circle */}
      <div
        className="absolute inset-0 rounded-full border-8"
        style={{
          borderColor: color,
          clipPath: `inset(${100 - safeValue}% 0 0 0)`
        }}
      ></div>

      {/* Percentage Text */}
      <div
        className="absolute text-2xl font-bold"
        style={{ color }}
      >
        {safeValue}%
      </div>

    </motion.div>
  );

}