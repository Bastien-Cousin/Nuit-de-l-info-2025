const mongoose = require("mongoose");
const Category = require("./models/Catégorie");

// Connection à MongoDB Atlas (plus d'options obsolètes)
mongoose.connect("mongodb+srv://dequidtclement1_db_user:Clement*MONGODB1998@nuitinfo2025.xxhieyq.mongodb.net/?appName=NuitInfo2025")
    .then(() => console.log("Connecté à MongoDB Atlas"))
    .catch(err => console.error("Erreur MongoDB :", err));

const categories = [
    { name: "Don de matériel", description: "Partage et annonces de dons de matériel informatique pour les établissements et familles." },
    { name: "Reconditionnement", description: "Guides, tutoriels et retours d'expérience pour reconditionner des ordinateurs." },
    { name: "Distribution Linux", description: "Discussions autour des distributions Linux éducatives, installation et configuration." },
    { name: "Pédagogie et usages", description: "Projets pédagogiques, activités et ressources éducatives libres." },
    { name: "Soutien et questions", description: "Support technique et conseils pour enseignants et participants." },
    { name: "Actualités et initiatives locales", description: "Informations sur les projets, événements et nouveautés NIRD." }
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