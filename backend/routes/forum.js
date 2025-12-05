const router = require("express").Router();
const Category = require("../models/Category");
const Thread = require("../models/Thread");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// --- Catégories ---
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Threads ---
router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find()
            .populate("author", "username")
            .populate("category", "name");
        res.json(threads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/categories/:categoryId/threads", auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ message: "Tous les champs sont requis" });

        const thread = new Thread({
            title,
            description,
            category: req.params.categoryId,
            author: req.user.id
        });

        const savedThread = await thread.save();
        await savedThread.populate([
            { path: "author", select: "username" },
            { path: "category", select: "name" }
        ]);

        res.status(201).json(savedThread);
    } catch (err) {
        console.error("Erreur création thread :", err);
        res.status(500).json({ error: err.message });
    }
});

// Récupérer un thread spécifique
router.get("/threads/:threadId", async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.threadId)
            .populate("author", "username")
            .populate("category", "name");
        if (!thread) return res.status(404).json({ msg: "Thread non trouvé" });
        res.json(thread);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Créer un thread
router.post("/categories/:categoryId/threads", auth, async (req, res) => {
    try {
        const { title, description } = req.body;

        // Création du thread
        const thread = new Thread({
            title,
            description,
            category: req.params.categoryId,
            author: req.user.id
        });

        // Sauvegarde et peuplement
        const savedThread = await thread.save();
        await savedThread.populate([
            { path: "author", select: "username" },
            { path: "category", select: "name" }
        ]);

        // Renvoi du thread créé peuplé
        res.status(201).json(savedThread);
    } catch (err) {
        console.error("Erreur création thread :", err);
        res.status(500).json({ error: err.message });
    }
});


// --- Messages ---
router.get("/threads/:threadId/messages", async (req, res) => {
    try {
        const messages = await Message.find({ thread: req.params.threadId })
            .populate("author", "username");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Créer un message et l'envoyer en temps réel
router.post("/threads/:threadId/messages", auth, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: "Le contenu est obligatoire" });

        const message = new Message({
            thread: req.params.threadId,
            author: req.user.id,
            content
        });

        const savedMessage = await message.save();
        const populatedMessage = await savedMessage.populate("author", "username");

        // Socket.io : vérifier que io est configuré
        const io = req.app.get("io");
        if (io) io.to(req.params.threadId).emit("message_received", populatedMessage);

        res.status(201).json(populatedMessage);
    } catch (err) {
        console.error("Erreur création message :", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;