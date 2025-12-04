import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MessageFormulaire } from "./MessageFormulaire";

export const Bulle = () => {
    const { threadId } = useParams();
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await axios.get(`http://localhost:5000/api/forum/threads/${threadId}/messages`);
        setMessages(res.data);
    };

    useEffect(() => {
        fetchMessages();
    }, [threadId]);

    return (
        <div style={{ padding: "20px" }}>
            <h3>Messages</h3>
            <MessageFormulaire threadId={threadId} onPosted={fetchMessages} />
            <ul>
                {messages.map(msg => (
                    <li key={msg._id}>
                        <strong>{msg.author.username}</strong>: {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};