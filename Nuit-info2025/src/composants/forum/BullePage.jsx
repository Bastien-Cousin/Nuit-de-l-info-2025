import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { MessageFormulaire } from "./MessageFormulaire";
import styles from "./BullePage.module.css";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

const socket = io("http://localhost:5000");

export const BullePage = () => {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    // --- Charger thread et messages ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [threadRes, messagesRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/forum/threads/${threadId}`),
                    axios.get(`http://localhost:5000/api/forum/threads/${threadId}/messages`)
                ]);
                setThread(threadRes.data);
                setMessages(messagesRes.data);
            } catch (err) {
                console.error("Erreur lors du chargement du thread :", err);
            }
        };
        fetchData();
    }, [threadId]);

    // --- Socket.io pour messages en temps réel ---
    useEffect(() => {
        if (!threadId) return;
        socket.emit("join_thread", threadId);

        const handleMessage = (msg) => setMessages(prev => [...prev, msg]);
        socket.on("message_received", handleMessage);

        return () => {
            socket.emit("leave_thread", threadId);
            socket.off("message_received", handleMessage);
        };
    }, [threadId]);

    if (!thread) return <div>Chargement...</div>;

    return (
      <>
        <Header />

        <div className={styles.container}>

            {/* Bouton retour */}
            <button 
                className={styles.backButton} 
                onClick={() => navigate("/forum")}
            >
                ← Retour au forum
            </button>

            <h2 className={styles.threadTitle}>{thread.title}</h2>
            <p className={styles.threadInfo}>{thread.description || "Pas de description."}</p>
            <p className={styles.threadInfo}>
                <strong>Catégorie :</strong> {thread.category?.name || "Inconnue"} | 
                <strong>Auteur :</strong> {thread.author?.username || "Anonyme"}
            </p>

            {/* Messages */}
            <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <p>Aucun message pour l'instant.</p>
                ) : (
                    messages.map(msg => (
                        <div
                            key={msg._id}
                            className={`${styles.message} ${msg.author?._id === localStorage.getItem("userId") ? styles.self : ""}`}
                        >
                            <div className={styles.messageAuthor}>{msg.author?.username || "Anonyme"}</div>
                            {msg.content}
                        </div>
                    ))
                )}
            </div>

            {/* Formulaire d'envoi */}
            <MessageFormulaire threadId={threadId} onPosted={() => {}} />
        </div>

        <Footer />
      </>
    );
};