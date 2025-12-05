// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");

dotenv.config();

const app = express();

// --- CORS ---
const allowedOrigins = [
  "https://nuit-info-2025.netlify.app",
  "http://localhost:5173" // Vite dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// --- Serveur HTTP + Socket.io ---
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Stocker io globalement pour l'utiliser dans les routes
app.set("io", io);

// --- ROUTES ---
app.get("/", (req, res) => res.send("Backend opérationnel !"));
app.get("/ping", (req, res) => res.send("pong"));

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

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

// --- MONGODB ---
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connecté"))
.catch((err) => console.error("Erreur MongoDB :", err));

// --- Middleware Erreurs 500 ---
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err);
  res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// --- PORT ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));