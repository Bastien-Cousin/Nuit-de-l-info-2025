const router = require("express").Router();
const Category = require("../models/Catégorie");
const Thread = require("../models/Thread");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// --- Catégories ---
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- Threads ---
router.get("/categories/:categoryId/threads", async (req, res) => {
    try {
        const threads = await Thread.find({ category: req.params.categoryId }).populate("author", "username");
        res.json(threads);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/categories/:categoryId/threads", auth, async (req, res) => {
    try {
        const { title } = req.body;
        const thread = new Thread({
            title,
            category: req.params.categoryId,
            author: req.user.id
        });
        await thread.save();
        res.status(201).json(thread);
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- Messages ---
router.get("/threads/:threadId/messages", async (req, res) => {
    try {
        const messages = await Message.find({ thread: req.params.threadId }).populate("author", "username");
        res.json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/threads/:threadId/messages", auth, async (req, res) => {
    try {
        const { content } = req.body;
        const message = new Message({
            thread: req.params.threadId,
            author: req.user.id,
            content
        });
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;