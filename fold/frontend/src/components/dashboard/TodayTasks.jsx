import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TodayTasks({ onTasksUpdate }) {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {

    try {

      setLoading(true);

      const res = await api.get("/api/tasks");

      const loadedTasks = res.data || [];

      setTasks(loadedTasks);

      if (onTasksUpdate) onTasksUpdate(loadedTasks);

    } catch (err) {

      console.error("Failed to load tasks:", err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {

    if (!input.trim()) return;

    try {

      const res = await api.post("/api/tasks", {
        title: input
      });

      const updated = [...tasks, res.data];

      setTasks(updated);

      if (onTasksUpdate) onTasksUpdate(updated);

      setInput("");

    } catch (err) {

      console.error(err);

    }

  };

  const toggleTask = async (id) => {

    try {

      const res = await api.put(`/api/tasks/${id}`);

      const updated = tasks.map(task =>
        task._id === id ? res.data : task
      );

      setTasks(updated);

      if (onTasksUpdate) onTasksUpdate(updated);

    } catch (err) {

      console.error(err);

    }

  };

  /* ==========================
     REFRESH DAY
  ========================== */

  const refreshDay = async () => {

  try {

    const incomplete = tasks.filter(t => !t.completed);

    localStorage.setItem(
      "rebalancedTasks",
      JSON.stringify(incomplete)
    );

    // 🔔 notify other components immediately
    window.dispatchEvent(new Event("tasksRebalanced"));

    await api.delete("/api/tasks/clear");

    setTasks([]);

    if (onTasksUpdate) {
      onTasksUpdate([]);
    }

    alert("Day refreshed. Incomplete tasks moved to Rebalanced Schedule.");

  } catch (err) {

    console.error("Refresh failed:", err);

  }

};

  return (

    <div className="bg-slate-800 p-4 rounded-xl">

      <div className="flex justify-between mb-3">

        <h2 className="text-white">Today's Tasks</h2>

        <button
          onClick={refreshDay}
          className="text-xs bg-purple-600 px-3 py-1 rounded"
        >
          Refresh Day
        </button>

      </div>

      {/* Input */}

      <div className="flex mb-3">

        <input
          className="flex-1 bg-slate-700 text-white p-2 rounded-l"
          placeholder="Add task"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && addTask()}
        />

        <button
          className="bg-blue-500 px-4 rounded-r"
          onClick={addTask}
        >
          Add
        </button>

      </div>

      {/* Tasks */}

      <div className="space-y-2">

        {loading && (
          <p className="text-gray-400 text-sm">Loading tasks...</p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="text-gray-400 text-sm">
            No tasks yet. Add one!
          </p>
        )}

        {tasks.map(task => (

          <div
            key={task._id}
            className="flex justify-between bg-slate-700 p-2 rounded"
          >

            <span
              className={
                task.completed
                  ? "line-through text-gray-400"
                  : "text-white"
              }
            >
              {task.title}
            </span>

            <button
              onClick={()=>toggleTask(task._id)}
              className="text-green-400"
            >
              ✓
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}