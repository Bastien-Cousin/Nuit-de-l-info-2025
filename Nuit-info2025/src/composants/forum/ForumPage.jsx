import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Forum.module.css";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const ForumPage = () => {
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newThreadOpen, setNewThreadOpen] = useState(false);
    const [newThread, setNewThread] = useState({ title: "", description: "", category: "" });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("http://localhost:5000/api/forum/categories");
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchThreads = async () => {
            let url = selectedCategory
                ? `http://localhost:5000/api/forum/categories/${selectedCategory}/threads`
                : `http://localhost:5000/api/forum/threads`;
            const res = await axios.get(url);
            setThreads(res.data);
        };
        fetchThreads();
    }, [selectedCategory, newThreadOpen]);

    const handleCreateThread = async () => {
        if (!newThread.title || !newThread.description || !newThread.category) return;
        await axios.post(
            `http://localhost:5000/api/forum/categories/${newThread.category}/threads`,
            { title: newThread.title, description: newThread.description },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setNewThreadOpen(false);
        setNewThread({ title: "", description: "", category: "" });
    };

    return (
        <>
        <Header />
        <div className={styles.container}>
            <h1>Forum</h1>

            {/* Filtre catégories */}
            <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className={styles.select}
            >
                <option value="">Toutes les catégories</option>
                {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
            </select>

            {/* Liste des bulles */}
            <div className={styles.threadList}>
                {threads.map(thread => (
                    <div key={thread._id} className={styles.threadCard}>
                        <h3>{thread.title}</h3>
                        <p>{thread.description}</p>
                        <button onClick={() => navigate(`/forum/${thread._id}`)}>Ouvrir</button>
                    </div>
                ))}
            </div>

            {/* Bouton + */}
            <button 
                className={styles.plusButton}
                onClick={() => setNewThreadOpen(true)}
            >
                +
            </button>

            {/* Modal création */}
            {newThreadOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Créer une nouvelle bulle</h2>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={newThread.title}
                            onChange={e => setNewThread({ ...newThread, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            value={newThread.description}
                            onChange={e => setNewThread({ ...newThread, description: e.target.value })}
                        />
                        <select
                            value={newThread.category}
                            onChange={e => setNewThread({ ...newThread, category: e.target.value })}
                        >
                            <option value="">Choisir une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className={styles.modalButtons}>
                            <button onClick={handleCreateThread}>Créer</button>
                            <button onClick={() => setNewThreadOpen(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};