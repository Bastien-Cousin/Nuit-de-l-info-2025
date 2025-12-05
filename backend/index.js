// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serveur HTTP + Socket.io
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "https://nuit-info-2025.netlify.app" } // autorise toutes les origines
});

// Stocker io globalement pour l'utiliser dans les routes
app.set("io", io);

// --- ROUTES ---

// Route principale pour tester le serveur
app.get("/", (req, res) => {
    res.send("Backend opérationnel !");
});

// Route ping pour UptimeRobot
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);

// --- SOCKET.IO ---
io.on("connection", (socket) => {
    console.log("🔌 Un utilisateur est connecté");

    socket.on("join_thread", (threadId) => {
        socket.join(threadId);
        console.log(`Utilisateur rejoint la room ${threadId}`);
    });

    socket.on("leave_thread", (threadId) => {
        socket.leave(threadId);
        console.log(`Utilisateur quitte la room ${threadId}`);
    });
});

// --- MONGODB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error("Erreur MongoDB :", err));

// --- PORT ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));