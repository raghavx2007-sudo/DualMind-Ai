const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  userMessage: String,
  aiReply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Conversation", ConversationSchema);