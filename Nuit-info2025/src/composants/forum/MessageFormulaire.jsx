import React, { useState, useEffect } from "react";
import axios from "axios";

export const MessageFormulaire = ({ threadId, onPosted }) => {
    const [content, setContent] = useState("");

    useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) return;
        await axios.post(
            `http://localhost:5000/api/forum/threads/${threadId}/messages`,
            { content },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setContent("");
        onPosted();
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