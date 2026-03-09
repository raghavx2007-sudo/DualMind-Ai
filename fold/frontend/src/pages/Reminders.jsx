import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import api from "../api/axios";

export default function Reminders() {
  const [reminder, setReminder] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);

  /* ================================
     LOAD REMINDERS FROM BACKEND
  ================================= */

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
  try {
    const res = await api.get("/api/reminders");

    console.log("REMINDER RESPONSE:", res.data);

    setList(res.data);
  } catch (err) {
    console.error("Error loading reminders:", err);
  }
};

  /* ================================
     ADD REMINDER
  ================================= */

  const addReminder = async () => {
    if (!reminder || !time || !date) return;

    try {
      const res = await api.post("https://dualmind-ai-xubm.onrender.com/api/reminders/add", {
        text: reminder,
        time: time,
        date: date,
      });

      setList([...list, res.data]);
      setReminder("");
      setTime("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================================
     DELETE REMINDER
  ================================= */

  const deleteReminder = async (id) => {
    try {
      await api.delete(`https://dualmind-ai-xubm.onrender.com/api/reminders/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6 text-white min-h-screen"
      >
        <h1 className="text-2xl font-bold mb-6">Reminders</h1>

        {/* INPUT */}
        <div className="flex gap-3 mb-6">

          <input
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Reminder text..."
            className="flex-1 bg-[#1e293b] p-3 rounded-xl border border-gray-700 outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#1e293b] p-3 rounded-xl border border-gray-700 outline-none"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-[#1e293b] p-3 rounded-xl border border-gray-700 outline-none"
          />

          <button
            onClick={addReminder}
            className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700"
          >
            Add
          </button>

        </div>

        {/* REMINDER LIST */}
        <div className="space-y-3">
          {list.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-[#1e293b] rounded-xl flex justify-between items-center"
            >

              <span>{item.text}</span>

              <div className="flex gap-4 items-center">
                {/* Display date + time from backend */}
                <span className="text-gray-400">
                  {new Date(item.dateTime).toLocaleString()}
                </span>

                <button
                  onClick={() => deleteReminder(item._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </motion.div>
    </Layout>
  );
}