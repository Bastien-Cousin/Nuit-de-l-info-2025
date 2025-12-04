import React, { useState } from "react";
import axios from "axios";

export const MessageFormulaire = ({ threadId, onPosted }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/forum/threads/${threadId}/messages`, { content }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setContent("");
        onPosted();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={content} onChange={e => setContent(e.target.value)} placeholder="Répondre..." required />
            <button type="submit">Envoyer</button>
        </form>
    );
};