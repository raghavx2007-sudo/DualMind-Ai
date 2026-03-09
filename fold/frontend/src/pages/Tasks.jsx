import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import api from "../api/axios";

export default function Tasks() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  /* ===============================
     LOAD TASKS
  =============================== */

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("https://dualmind-ai-xubm.onrender.com/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  /* ===============================
     ADD TASK
  =============================== */

  const addTask = async () => {

    if (!task.trim()) return;

    try {

      const res = await api.post(
        "https://dualmind-ai-xubm.onrender.com/api/tasks",
        { title: task }
      );

      setTasks([res.data, ...tasks]);

      setTask("");

    } catch (error) {
      console.error("Task save failed:", error);
    }
  };

  /* ===============================
     TOGGLE COMPLETE
  =============================== */

  const toggleTask = async (id) => {

    try {

      const res = await api.put(
        `https://dualmind-ai-xubm.onrender.com/api/tasks/${id}`
      );

      setTasks(tasks.map((t) =>
        t._id === id ? res.data : t
      ));

    } catch (err) {
      console.error("Toggle failed:", err);
    }

  };

  /* ===============================
     DELETE TASK
  =============================== */

const deleteTask = async (id) => {

  console.log("Deleting:", id);

  try {

    await api.delete(`https://dualmind-ai-xubm.onrender.com/api/tasks/${id}`);

    setTasks(tasks.filter((t) => t._id !== id));

  } catch (err) {

    console.error("Delete failed:", err);

  }

};

  /* ===============================
     UI
  =============================== */

  return (

    <Layout>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-white min-h-screen"
      >

        <h1 className="text-2xl font-bold mb-6">Tasks</h1>

        {/* INPUT */}

        <div className="flex gap-3 mb-6">

          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 bg-[#1e293b] p-3 rounded-xl border border-gray-700 outline-none"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button
            onClick={addTask}
            className="bg-blue-600 px-4 rounded-xl hover:bg-blue-700 flex items-center justify-center"
          >
            <FaPlus />
          </button>

        </div>

        {/* TASK LIST */}

        <div className="space-y-3">

          {tasks.map((t) => (

            <motion.div
              key={t._id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${
                t.completed ? "bg-green-700" : "bg-[#1e293b]"
              }`}
            >

              <div className="flex justify-between items-center">

                <span className={t.completed ? "line-through" : ""}>
                  {t.title}
                </span>

                <div className="flex gap-4">

                  {/* COMPLETE */}
                  <button
                    onClick={() => toggleTask(t._id)}
                    className="text-white"
                  >
                    <FaCheck />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTask(t._id)}
                    className="text-red-400"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>

    </Layout>

  );

}