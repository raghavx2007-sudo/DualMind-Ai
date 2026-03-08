const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  text: { type: String, required: true },
  dateTime: { type: Date, required: true }, // combined date + time
});

module.exports = mongoose.model("Reminder", ReminderSchema);