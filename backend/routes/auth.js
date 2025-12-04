const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription
router.post("/signup", async (req, res) => {
    try {
        const { type, nom, prenom, adresse, ville, email, username, password } = req.body;

        // Vérifier si l’utilisateur existe
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            type, nom, prenom, adresse, ville, email, username, password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "Compte créé avec succès" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Connexion
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user._id, username: user.username, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, user: { username: user.username, email: user.email, type: user.type } });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;