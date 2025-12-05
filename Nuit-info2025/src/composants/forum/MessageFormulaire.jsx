import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/forum`;

export const MessageFormulaire = ({ threadId, onPosted }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) return;

        try {
            const res = await axios.post(
                `${API_URL}/threads/${threadId}/messages`,
                { content },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setContent("");
            onPosted(res.data); // envoyer le message reçu pour mettre à jour l'affichage
        } catch (err) {
            console.error("Erreur en envoyant le message :", err.response?.data || err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Écrire un message..."
            />
            <button type="submit">Envoyer</button>
        </form>
    );
};