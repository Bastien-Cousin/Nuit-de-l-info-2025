const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Accès refusé" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // s'assurer que l'id est présent
        req.user = { id: verified._id || verified.id };
        next();
    } catch (err) {
        res.status(400).json({ message: "Token invalide" });
    }
};

module.exports = auth;