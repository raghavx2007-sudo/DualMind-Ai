import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import DailyQuote from "../components/dashboard/DailyQuote";
import BRIGauge from "../components/dashboard/BRIGauge";
import DSGauge from "../components/dashboard/DSGauge";
import BRILineChart from "../components/dashboard/BRILineChart";
import DSLineChart from "../components/dashboard/DSLineChart";
import TodayTasks from "../components/dashboard/TodayTasks";
import SuggestedBreak from "../components/dashboard/SuggestedBreak";
import RebalancedTasks from "../components/dashboard/RebalancedTasks";

import api from "../api/axios";

export default function Dashboard() {

  const [briHistory, setBriHistory] = useState([]);
  const [stressHistory, setStressHistory] = useState([]);

  const getTodayLabel = () => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[new Date().getDay()];
  };

  const getWeeklyTemplate = () => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days.map(day => ({ day, value: 0 }));
  };

  const fetchAIStats = async () => {
    try {
      const response = await api.post("/api/analyze", {
        text: "I have many assignments due tomorrow and exams coming."
      });

      const briValue = response.data?.bri ?? response.data?.analysis?.bri ?? 50;
      const stressValue = response.data?.stress ?? response.data?.analysis?.stress ?? 50;

      const today = getTodayLabel();

      const updatedBRI = getWeeklyTemplate().map(d => {
        const found = briHistory.find(b => b.day === d.day);
        return d.day === today
          ? { day: today, value: briValue }
          : found ?? d;
      });

      const updatedStress = getWeeklyTemplate().map(d => {
        const found = stressHistory.find(s => s.day === d.day);
        return d.day === today
          ? { day: today, value: stressValue }
          : found ?? d;
      });

      setBriHistory(updatedBRI);
      setStressHistory(updatedStress);

    } catch (error) {
      console.error("AI fetch error:", error);

      const today = getTodayLabel();

      setBriHistory(getWeeklyTemplate().map(d => d.day === today ? { day: today, value: 50 } : d));
      setStressHistory(getWeeklyTemplate().map(d => d.day === today ? { day: today, value: 50 } : d));
    }
  };

  useEffect(() => {
    fetchAIStats();
  }, []);

  const updateScoresFromTasks = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    if (total === 0) return;

    const disciplineScore = Math.round((completed / total) * 100);
    const burnoutRisk = 100 - disciplineScore;
    const today = getTodayLabel();

    setStressHistory(prev => getWeeklyTemplate().map(d => {
      const found = prev.find(s => s.day === d.day);
      return d.day === today
        ? { day: today, value: disciplineScore }
        : found ?? d;
    }));

    setBriHistory(prev => getWeeklyTemplate().map(d => {
      const found = prev.find(b => b.day === d.day);
      return d.day === today
        ? { day: today, value: burnoutRisk }
        : found ?? d;
    }));
  };

  const todayBRI = briHistory.find(d => d.day === getTodayLabel())?.value ?? 50;
  const todayStress = stressHistory.find(d => d.day === getTodayLabel())?.value ?? 50;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <DailyQuote />

        {/* Gauge + Tasks */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <BRIGauge value={todayBRI} />
          <DSGauge value={todayStress} />

          {/* Wrap tasks in scrollable card */}
          <div className="bg-white shadow-md rounded-2xl p-4 overflow-y-auto max-h-[350px]">
            <TodayTasks onTasksUpdate={updateScoresFromTasks} />
          </div>
        </div>

        {/* Line charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <BRILineChart data={briHistory} />
          <DSLineChart data={stressHistory} />
        </div>

        {/* Suggestions and rebalanced tasks */}
        <div className="grid grid-cols-2 gap-6">
          <SuggestedBreak bri={todayBRI} stress={todayStress} />
          <RebalancedTasks />
        </div>
      </motion.div>
    </Layout>
  );
}