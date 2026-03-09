import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import api from "../api/axios";

export default function LearningAI() {

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatRef = useRef(null);

  /* ================================
     LOAD CHAT FROM SESSION
  ================================ */

  const [messages, setMessages] = useState(() => {

    try {

      const savedChat = sessionStorage.getItem("learningAIChat");

      if (savedChat) {
        return JSON.parse(savedChat);
      }

    } catch (err) {

      console.error("Session parse error", err);

    }

    return [
      {
        sender: "ai",
        text: "👋 Hi! I'm your AI Learning Assistant. Ask me about programming, concepts, or anything you want to learn.",
        time: new Date().toLocaleTimeString(),
      },
    ];

  });

  /* ================================
     SAVE CHAT
  ================================ */

  useEffect(() => {
    sessionStorage.setItem("learningAIChat", JSON.stringify(messages));
  }, [messages]);

  /* ================================
     AUTO SCROLL
  ================================ */

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================================
     AI SPEECH
  ================================ */

  const speakText = (text) => {

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const savedSpeed = localStorage.getItem("voiceSpeed");

    if (savedSpeed) utterance.rate = savedSpeed;

    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);

  };

  const stopSpeech = () => {

    window.speechSynthesis.cancel();

    setIsSpeaking(false);

  };

  /* ================================
     VOICE INPUT
  ================================ */

  const startVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Voice not supported");

    const recognition = new SpeechRecognition();

    recognition.start();

    setIsRecording(true);

    recognition.onresult = (e) => {

      setInput(e.results[0][0].transcript);

      setIsRecording(false);

    };

    recognition.onend = () => setIsRecording(false);

  };

  /* ================================
     SEND MESSAGE
  ================================ */

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userText = input;

    const userMsg = {
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setTyping(true);

    try {

      const response = await api.post("/api/chat", {
        text: userText,
        mode: "learning"
      });

      const aiMsg = {
        sender: "ai",
        text: response.data.reply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      /* AI SPEAKS RESPONSE */

      speakText(response.data.reply);

    } catch (error) {

      console.error(error);

      const errorMsg = {
        sender: "ai",
        text: "⚠ AI learning server not responding.",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMsg]);

    }

    setTyping(false);

  };

  return (

    <Layout>

      <div className="flex flex-col h-screen text-white p-6">

        <h1 className="text-2xl font-bold mb-4">
          AI Learning Assistant
        </h1>

        {/* CHAT */}

        <div className="flex-1 overflow-y-auto space-y-4">

          {messages.map((msg, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === "user" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              className={`max-w-md p-4 rounded-2xl whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-[#1e293b]"
              }`}
            >

              {msg.text}

              <span className="text-xs text-gray-400 block mt-2">
                {msg.time}
              </span>

            </motion.div>

          ))}

          {typing && (
            <div className="bg-[#1e293b] p-3 rounded-2xl w-24 animate-pulse">
              Thinking...
            </div>
          )}

          <div ref={chatRef} />

        </div>

        {/* INPUT */}

        <div className="flex gap-4 mt-4 items-center">

          <div className="relative flex-1">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something you want to learn..."
              className="w-full bg-[#1e293b] p-4 pr-14 rounded-full border border-gray-700 outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* MIC BUTTON */}

            <button
              onClick={startVoiceInput}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                isRecording
                  ? "text-red-500 animate-pulse"
                  : "text-gray-400"
              }`}
            >
              <FaMicrophone size={18} />
            </button>

          </div>

          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 w-14 h-14 rounded-full flex items-center justify-center"
          >
            <FaPaperPlane size={20} />
          </button>

        </div>

        {/* BONUS: VOICE ORB */}

        <button
          onClick={stopSpeech}
          className={`fixed right-8 top-1/2 -translate-y-1/2 
          w-20 h-20 rounded-full flex items-center justify-center 
          shadow-2xl transition-all duration-300
          ${
            isSpeaking
              ? "bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse scale-110"
              : "bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-105"
          }`}
        >
          <span className="text-3xl">🎙️</span>
        </button>

      </div>

    </Layout>

  );

}