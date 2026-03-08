const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      default: "medium"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);