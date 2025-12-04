import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BulleFormulaire } from "./BulleFormulaire";

export const Catégorie = ({ categoryId }) => {
    const [category, setCategory] = useState(null);
    const [threads, setThreads] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Récupérer la catégorie et ses threads
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const resCat = await axios.get(`http://localhost:5000/api/forum/categories`);
                const cat = resCat.data.find(c => c._id === categoryId);
                setCategory(cat);

                const resThreads = await axios.get(`http://localhost:5000/api/forum/categories/${categoryId}/threads`);
                setThreads(resThreads.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategory();
    }, [categoryId]);

    if (!category) return <p>Chargement...</p>;

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>{category.name}</h2>

            <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: "15px" }}>
                {showForm ? "Annuler" : "Créer une bulle de discussion"}
            </button>

            {showForm && <BulleFormulaire categoryId={category._id} onCreated={async () => {
                const res = await axios.get(`http://localhost:5000/api/forum/categories/${categoryId}/threads`);
                setThreads(res.data);
                setShowForm(false);
            }} />}

            {threads.length === 0 ? (
                <p>Aucune bulle de discussion pour cette catégorie.</p>
            ) : (
                <ul>
                    {threads.map(thread => (
                        <li key={thread._id} style={{ margin: "5px 0" }}>
                            <Link to={`/thread/${thread._id}`} style={{ color: "blue" }}>
                                {thread.title} - {thread.author.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};