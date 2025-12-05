import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { MessageFormulaire } from "./MessageFormulaire";
import styles from "./BullePage.module.css";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(SOCKET_URL);

export const BullePage = () => {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/forum`;

    // --- Charger thread et messages ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [threadRes, messagesRes] = await Promise.all([
                    axios.get(`${API_URL}/threads/${threadId}`),
                    axios.get(`${API_URL}/threads/${threadId}/messages`)
                ]);

                setThread(threadRes.data);
                setMessages(messagesRes.data.filter(msg => msg));
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

        const handleMessage = (msg) => {
            if (!msg) return;
            setMessages(prev => [...prev, msg]);
        };

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

                <div className={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        <p>Aucun message pour l'instant.</p>
                    ) : (
                        messages.map(msg => {
                            if (!msg) return null;
                            return (
                                <div
                                    key={msg._id}
                                    className={`${styles.message} ${msg.author?._id === localStorage.getItem("userId") ? styles.self : ""}`}
                                >
                                    <div className={styles.messageAuthor}>{msg.author?.username || "Anonyme"}</div>
                                    {msg.content}
                                </div>
                            );
                        })
                    )}
                </div>

                <MessageFormulaire threadId={threadId} onPosted={(newMsg) => {
                    if (newMsg) setMessages(prev => [...prev, newMsg]);
                }} />
            </div>
            <Footer />
        </>
    );
};