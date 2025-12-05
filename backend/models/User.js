const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    type: { type: String, enum: ["particulier", "organisation", "entreprise"], required: true },
    nom: { type: String, required: true },
    prenom: { type: String },
    adresse: { type: String },
    ville: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);