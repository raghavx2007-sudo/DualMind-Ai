import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DailyQuote() {

  const [quote, setQuote] = useState("");

  const quotes = [
    "Small progress is still progress.",
    "Consistency beats intensity.",
    "Focus on the step in front of you.",
    "Great things take time.",
    "Your future self will thank you.",
    "Stay patient and trust the process.",
    "Discipline builds freedom.",
    "Every day is a fresh start."
  ];

  useEffect(() => {

    const today = new Date().getDate();

    setQuote(quotes[today % quotes.length]);

  }, []);

  return (

    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#1e293b] rounded-xl p-5 mb-6 border border-gray-800"
    >

      <p className="text-gray-300 italic text-center">
        "{quote}"
      </p>

    </motion.div>

  );

}