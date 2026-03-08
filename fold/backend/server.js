require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const Conversation = require("./models/Conversation");
const Dashboard = require("./models/Dashboard");
const Task = require("./models/Task");

const analyticsRoutes = require("./routes/analyticsRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 5000;

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   CONNECT DATABASE
========================= */

connectDB();

/* =========================
   ROUTES
========================= */

app.use("/api/analytics", analyticsRoutes);
app.use("/api", taskRoutes);
app.use("/api/reminders", reminderRoutes);

/* =========================
   DASHBOARD DATA
========================= */

app.get("/api/dashboard", async (req, res) => {

  try {

    let data = await Dashboard.findOne();

    if (!data) {

      data = await Dashboard.create({
        tasksCompleted: 0,
        reminders: 0,
        mood: "neutral",
        aiInteractions: 0,
        discipline: 0,
        burnout: 0
      });

    }

    res.json(data);

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      error: "Failed to fetch dashboard data"
    });

  }

});

/* =========================
   TASK APIs
========================= */

app.get("/api/tasks", async (req, res) => {

  try {

    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({ error: "Failed to fetch tasks" });

  }

});

app.post("/api/tasks", async (req, res) => {

  try {

    const task = await Task.create({
      title: req.body.title,
      priority: req.body.priority || "medium"
    });

    res.json(task);

  } catch (err) {

    res.status(500).json({ error: "Task creation failed" });

  }

});

app.put("/api/tasks/:id", async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;

    await task.save();

    const tasks = await Task.find();

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    const discipline = total === 0 ? 0 : Math.round((completed / total) * 100);
    const burnout = 100 - discipline;

    await Dashboard.updateOne(
      {},
      {
        discipline: discipline,
        burnout: burnout
      },
      { upsert: true }
    );

    res.json(task);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: "Task update failed" });

  }

});

/* =========================
   CHAT ENDPOINT
========================= */

app.post("/api/chat", async (req, res) => {

  const { text } = req.body;

  try {

    const responses = [

      "I understand what you're sharing. Taking a moment to slow down and breathe can help bring clarity.",

      "Thank you for expressing your thoughts. Small positive steps can make a meaningful difference.",

      "It sounds like you're reflecting on something important. Try focusing on one constructive action you can take next.",

      "Your message has been noted. Staying mindful and balanced can help maintain focus and productivity."

    ];

    const aiReply = responses[Math.floor(Math.random() * responses.length)];

    const conversation = new Conversation({
      userMessage: text,
      aiReply: aiReply
    });

    await conversation.save();

    await Dashboard.updateOne(
      {},
      { $inc: { aiInteractions: 1 } },
      { upsert: true }
    );

    res.json({
      reply: aiReply
    });

  } catch (error) {

    console.error("Chat Error:", error);

    res.status(500).json({
      reply: "Unable to process message."
    });

  }

});

/* =========================
   BASIC ANALYSIS
========================= */

app.post("/api/analyze", async (req, res) => {

  const { text } = req.body;

  try {

    const bri = Math.floor(Math.random() * 100);
    const stress = Math.floor(Math.random() * 100);

    const analysis =
      "The message indicates a moderate cognitive workload. Maintaining balance, organizing tasks, and taking short breaks may help sustain productivity.";

    res.json({
      bri,
      stress,
      analysis
    });

  } catch (error) {

    console.error("Analysis Error:", error);

    res.json({
      bri: 50,
      stress: 50,
      analysis: "Analysis unavailable."
    });

  }

});

/* =========================
   GET CHAT HISTORY
========================= */

app.get("/api/history", async (req, res) => {

  try {

    const chats = await Conversation.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(chats);

  } catch (error) {

    console.error("History Error:", error);

    res.status(500).json({
      error: "Failed to fetch history"
    });

  }

});

/* =========================
   TASK REBALANCE
========================= */

app.post("/api/tasks/rebalance", async (req, res) => {

  try {

    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.json({ message: "No tasks to rebalance" });
    }

    console.log("Rebalanced tasks:", tasks);

    res.json({
      message: "Tasks moved to rebalance schedule",
      tasks
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({ error: "Rebalance failed" });

  }

});

/* =========================
   CLEAR TASKS
========================= */

app.delete("/api/tasks/clear", async (req, res) => {

  try {

    await Task.deleteMany({});

    res.json({ message: "Tasks cleared for new day" });

  } catch (err) {

    console.error(err);

    res.status(500).json({ error: "Failed to clear tasks" });

  }

});

/* =========================
   SERVER START
========================= */

app.listen(PORT, () => {

  console.log(`🚀 Server running on http://localhost:${PORT}`);

});