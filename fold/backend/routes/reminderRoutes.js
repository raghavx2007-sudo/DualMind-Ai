const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const auth = require("../middleware/authMiddleware");


// ADD REMINDER
router.post("/add", auth, async (req, res) => {

  try {

    const { text, date, time } = req.body;

    const dateTime = new Date(`${date}T${time}`);

    const reminder = new Reminder({
      text,
      dateTime,
      user: req.user.id
    });

    await reminder.save();

    res.json(reminder);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to add reminder" });

  }

});


// GET REMINDERS
router.get("/", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ dateTime: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE REMINDER
router.delete("/:id", auth, async (req, res) => {

  try {

    await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({ message: "Reminder deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to delete reminder" });

  }

});

module.exports = router;