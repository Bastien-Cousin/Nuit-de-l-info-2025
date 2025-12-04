import React, { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const MessageFormulaire = ({ threadId }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            `http://localhost:5000/api/forum/threads/${threadId}/messages`,
            { content },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        // Prévenir les autres utilisateurs
        socket.emit("new_message", { threadId, message: res.data });

        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Répondre..."
                required
            />
            <button type="submit">Envoyer</button>
        </form>
    );
};