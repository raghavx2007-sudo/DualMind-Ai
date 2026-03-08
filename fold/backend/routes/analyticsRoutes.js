const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/* =========================
   BRI SCORE
========================= */

router.get("/bri", async (req, res) => {

  try {

    const tasks = await Task.find();

    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length || 1;

    const workload = total * 10;
    const stress = (total - completed) * 8;

    const bri = Math.min(100, workload + stress);

    res.json({ bri });

  } catch (err) {

    res.status(500).json({ error: "BRI calculation failed" });

  }

});

/* =========================
   DISCIPLINE SCORE
========================= */

router.get("/discipline", async (req, res) => {

  try {

    const tasks = await Task.find();

    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length || 1;

    const discipline = Math.round((completed / total) * 100);

    res.json({ discipline });

  } catch (err) {

    res.status(500).json({ error: "Discipline calculation failed" });

  }

});

module.exports = router;
