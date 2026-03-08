const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Memory", MemorySchema);