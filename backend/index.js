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
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

// Stocker io globalement
app.set("io", io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);

// Socket.io
io.on("connection", (socket) => {
    console.log("🔌 Un utilisateur est connecté");

    socket.on("join_thread", (threadId) => {
        socket.join(threadId);
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));