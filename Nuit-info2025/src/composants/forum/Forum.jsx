import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';

export const Forum = () => {
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState({});
    const [newThreadTitle, setNewThreadTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Récupération des catégories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/forum/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Erreur récupération catégories :", err);
            }
        };
        fetchCategories();
    }, []);

    // Récupération des threads pour une catégorie
    const fetchThreads = async (categoryId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/forum/categories/${categoryId}/threads`);
            setThreads(prev => ({ ...prev, [categoryId]: res.data }));
        } catch (err) {
            console.error("Erreur récupération threads :", err);
        }
    };

    // Création d'une nouvelle bulle
    const handleCreateThread = async () => {
        if (!newThreadTitle || !selectedCategory) return;
        try {
            await axios.post(
                `http://localhost:5000/api/forum/categories/${selectedCategory}/threads`,
                { title: newThreadTitle },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setNewThreadTitle("");
            fetchThreads(selectedCategory); // rafraîchir la liste
        } catch (err) {
            alert("Erreur lors de la création de la bulle : " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <>
        <Header />
        <div style={{ padding: "20px" }}>
            <h1>Forum</h1>

            {/* Formulaire création bulle */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Créer une nouvelle bulle de discussion</h3>
                <select 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)}
                    style={{ marginRight: "10px" }}
                >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    placeholder="Titre de la bulle" 
                    value={newThreadTitle} 
                    onChange={e => setNewThreadTitle(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleCreateThread}>Créer</button>
            </div>

            {/* Affichage des catégories et threads */}
            {categories.map(cat => (
                <div key={cat._id} style={{ marginBottom: "30px" }}>
                    <h2>{cat.name}</h2>
                    <button onClick={() => fetchThreads(cat._id)} style={{ marginBottom: "10px" }}>
                        Rafraîchir les bulles
                    </button>
                    <ul>
                        {(threads[cat._id] || []).map(thread => (
                            <li key={thread._id}>
                                <Link to={`/thread/${thread._id}`}>
                                    {thread.title} - {thread.author.username}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <Footer />
        </>
    );
};