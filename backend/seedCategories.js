const mongoose = require("mongoose");
const Category = require("./models/Catégorie");

// Connection à MongoDB Atlas (plus d'options obsolètes)
mongoose.connect("mongodb+srv://dequidtclement1_db_user:Clement*MONGODB1998@nuitinfo2025.xxhieyq.mongodb.net/?appName=NuitInfo2025")
    .then(() => console.log("Connecté à MongoDB Atlas"))
    .catch(err => console.error("Erreur MongoDB :", err));

const categories = [
    { name: "Exemple1", description: "Catégorie test 1" },
    { name: "Exemple2", description: "Catégorie test 2" },
    { name: "Exemple3", description: "Catégorie test 3" },
];

const seedCategories = async () => {
    try {
        await Category.deleteMany(); // supprime les anciennes catégories
        await Category.insertMany(categories);
        console.log("Catégories ajoutées !");
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

seedCategories();