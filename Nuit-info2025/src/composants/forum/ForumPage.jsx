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

  // --- Charger les catégories ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/forum/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur chargement catégories :", err);
      }
    };
    fetchCategories();
  }, []);

  // --- Charger les threads ---
  const fetchThreads = async (categoryId = selectedCategory) => {
    try {
      const url = categoryId
        ? `http://localhost:5000/api/forum/categories/${categoryId}/threads`
        : `http://localhost:5000/api/forum/threads`;
      const res = await axios.get(url);
      setThreads(res.data);
    } catch (err) {
      console.error("Erreur chargement threads :", err);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [selectedCategory]);

  // --- Créer un nouveau thread ---
  const handleCreateThread = async () => {
    if (!newThread.title || !newThread.description || !newThread.category) {
        alert("Merci de remplir tous les champs !");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vous devez être connecté pour créer une bulle.");
            return;
        }

        const res = await axios.post(
            `http://localhost:5000/api/forum/categories/${newThread.category}/threads`,
            { title: newThread.title, description: newThread.description },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setThreads(prev => [res.data, ...prev]);
        setNewThreadOpen(false);
        setNewThread({ title: "", description: "", category: "" });

    } catch (err) {
        console.error("Erreur lors de la création du thread :", err.response?.data || err);
        alert("Erreur lors de la création de la bulle : " + (err.response?.data?.message || err.message));
    }
  };

  // --- Couleurs par catégorie
  const categoryColors = {
    "69321950017221d5b1b5162b": "#1758ae",
    "69321950017221d5b1b5162c": "#c83fed",
    "69321950017221d5b1b5162d": "#f6d13a"
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

        {/* Liste des threads */}
        <div className={styles.threadList}>
          {threads.map(thread => {
            const color = categoryColors[thread.category?._id] || "#bdc3c7"; // couleur par défaut
            return (
              <div key={thread._id} className={styles.threadCard} style={{ borderColor: color }}>
                <h3 style={{ color }}>{thread.title}</h3>
                <p>{thread.description}</p>
                <button 
                  onClick={() => navigate(`/forum/${thread._id}`)}
                  style={{ backgroundColor: color, color: "#fff" }}
                >
                  Ouvrir
                </button>
              </div>
            )
          })}
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
                <button
                  onClick={() => {
                    setNewThreadOpen(false);
                    setNewThread({ title: "", description: "", category: "" });
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};