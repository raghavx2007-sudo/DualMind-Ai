import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [reminders, setReminders] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reminders");
      setReminders(res.data);
      prepareChartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare chart data: count reminders per date
  const prepareChartData = (reminders) => {
    const dataMap = {};
    reminders.forEach((item) => {
      const date = new Date(item.dateTime).toLocaleDateString();
      dataMap[date] = (dataMap[date] || 0) + 1;
    });

    const dataArray = Object.keys(dataMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((date) => ({
        date,
        tasks: dataMap[date],
      }));

    setChartData(dataArray);
  };

  return (
    <Layout>
      <div className="p-6 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">Reminders Analytics</h1>

        {/* Total Reminders */}
        <div className="mb-6">
          <div className="bg-[#1e293b] p-4 rounded-xl w-48 text-center shadow-lg">
            <p className="text-gray-400">Total Reminders</p>
            <p className="text-3xl font-bold">{reminders.length}</p>
          </div>
        </div>

        {/* Bar Chart - Denodo Line Style */}
        <div className="bg-[#1e293b] p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Reminders per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#2c3e50" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#fff", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#fff", fontSize: 12 }}
                allowDecimals={false} // Only whole numbers
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.1)" }}
                formatter={(value) => [`${value} task${value > 1 ? "s" : ""}`, ""]}
              />
              <Bar
                dataKey="tasks"
                fill="#8b5cf6"
                barSize={6}           // Thin vertical line
                radius={[3, 3, 0, 0]} // Rounded top corners
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Reminders */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Upcoming Reminders (Next 7 Days)</h2>
          <div className="space-y-2">
            {reminders
              .filter((r) => {
                const reminderDate = new Date(r.dateTime);
                const today = new Date();
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                return reminderDate >= today && reminderDate <= nextWeek;
              })
              .map((r) => (
                <div
                  key={r._id}
                  className="bg-[#1e293b] p-2 rounded-xl flex justify-between shadow-sm"
                >
                  <span>{r.text}</span>
                  <span className="text-gray-400">
                    {new Date(r.dateTime).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}