require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const Conversation = require("./models/Conversation");
const Dashboard = require("./models/Dashboard");
const Task = require("./models/Task");
const OpenAI = require("openai");

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

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

  const { text, mode } = req.body;

  try {

    let prompt = text;

    if (mode === "learning") {

      prompt = `
You are an expert teacher AI.

Explain the topic clearly for a student.

Structure your answer like:

1. Simple Explanation
2. Step-by-step breakdown
3. Real-world example
4. Key points summary

Topic:
${text}
`;

    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const aiReply = completion.choices[0].message.content;

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

    console.error("Groq Error:", error);

    res.json({
      reply: "AI service temporarily unavailable."
    });

  }

});

/* =========================
   BASIC ANALYSIS
========================= */

app.post("/api/analyze", async (req, res) => {

  const { text } = req.body;

  try {

    const prompt = `
Analyze the emotional state of the following message.

Return:
1. Stress level (0-100)
2. Burnout risk
3. Short explanation

Message:
${text}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const aiText = completion.choices[0].message.content;

    res.json({
      analysis: aiText
    });

  } catch (error) {

    console.error("Analysis Error:", error);

    res.json({
      analysis: "Fallback analysis"
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