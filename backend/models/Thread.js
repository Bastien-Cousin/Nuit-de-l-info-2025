const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }, // <-- ajouté pour correspondre à tes inputs
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);