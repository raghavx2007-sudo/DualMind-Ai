import { useEffect, useState } from "react";

export default function RebalancedTasks() {

  const [tasks, setTasks] = useState([]);

  const loadRebalancedTasks = () => {

    try {

      const saved = localStorage.getItem("rebalancedTasks");

      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        setTasks([]);
      }

    } catch (error) {

      console.error("Failed to load rebalanced tasks:", error);
      setTasks([]);

    }

  };

  useEffect(() => {

  const loadRebalancedTasks = () => {

    const saved = localStorage.getItem("rebalancedTasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
    }

  };

  loadRebalancedTasks();

  // listen for refresh event
  window.addEventListener("tasksRebalanced", loadRebalancedTasks);

  return () => {
    window.removeEventListener("tasksRebalanced", loadRebalancedTasks);
  };

}, []);

  return (

    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">

      <h3 className="text-lg font-semibold mb-3">
        Rebalanced Schedule
      </h3>

      {tasks.length === 0 && (

        <p className="text-gray-400 text-sm">
          No rescheduled tasks. Your schedule looks balanced.
        </p>

      )}

      {tasks.map((task, index) => (

        <div
          key={index}
          className="bg-slate-700 text-white p-2 rounded mb-2"
        >
          {task.title}
        </div>

      ))}

    </div>

  );

}