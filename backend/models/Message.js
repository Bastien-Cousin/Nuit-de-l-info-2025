const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Message || mongoose.model("Message", MessageSchema);