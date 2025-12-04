import React, { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const MessageFormulaire = ({ threadId, onPosted }) => {
    const [content, setContent] = useState("");

    const handleSend = async () => {
        if (!content.trim()) return;

        const res = await axios.post(
            `http://localhost:5000/api/forum/threads/${threadId}/messages`,
            { content },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        const newMessage = res.data;

        // Envoi temps réel
        socket.emit("sendMessage", {
            threadId,
            message: newMessage
        });

        onPosted(newMessage);
        setContent("");
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <input
                type="text"
                placeholder="Votre message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={handleSend}>Envoyer</button>
        </div>
    );
};