const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");

// ADD REMINDER
router.post("/add", async (req, res) => {
  try {
    const { text, date, time } = req.body;

    // combine date + time into a single Date object
    const dateTime = new Date(`${date}T${time}`);

    const reminder = new Reminder({ text, dateTime });
    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

// GET REMINDERS (sorted by datetime)
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ dateTime: 1 });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// DELETE REMINDER
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete reminder" });
  }
});

module.exports = router;