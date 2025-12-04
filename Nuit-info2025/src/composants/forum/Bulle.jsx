import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { MessageFormulaire } from "./MessageFormulaire";

const socket = io("http://localhost:5000");

export const Bulle = () => {
    const { threadId } = useParams();
    const [messages, setMessages] = useState([]);

    // Récupération initiale
    const fetchMessages = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/forum/threads/${threadId}/messages`
        );
        setMessages(res.data);
    };

    // Connexion Socket.IO
    useEffect(() => {
        fetchMessages();

        // rejoindre la room
        socket.emit("joinThread", threadId);

        // écoute des nouveaux messages en temps réel
        socket.on("newMessage", (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [threadId]);

    return (
        <div style={{ padding: "20px" }}>
            <h3>Messages</h3>

            {/* Formulaire d'envoi */}
            <MessageFormulaire 
                threadId={threadId}
                onPosted={(msg) => setMessages(prev => [...prev, msg])}
            />

            <ul>
                {messages.map(msg => (
                    <li key={msg._id || Math.random()}>
                        <strong>{msg.author?.username || "Anonyme"}</strong> : {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};