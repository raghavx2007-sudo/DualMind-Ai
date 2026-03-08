const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  burnout: { type: Number, default: 0 },
  discipline: { type: Number, default: 0 },

  tasks: [
    {
      title: String,
      completed: Boolean
    }
  ],

  burnoutTrend: { type: [Number], default: [] },
  disciplineTrend: { type: [Number], default: [] },

  suggestion: String,
  rebalance: String
});

module.exports = mongoose.model("Dashboard", dashboardSchema);