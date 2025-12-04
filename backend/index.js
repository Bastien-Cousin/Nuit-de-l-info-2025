const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error(err));

// =====================
// SOCKET.IO EVENTS
// =====================
io.on("connection", (socket) => {
    console.log("Nouvel utilisateur connecté :", socket.id);

    // rejoindre une bulle
    socket.on("joinThread", (threadId) => {
        socket.join(threadId);
    });

    // réception d’un message
    socket.on("sendMessage", (data) => {
        // data = { threadId, message }
        io.to(data.threadId).emit("newMessage", data.message);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));