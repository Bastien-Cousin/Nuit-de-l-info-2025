import React, { useState } from "react";
import axios from "axios";

export const BulleFormulaire = ({ categoryId, onCreated }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/forum/categories/${categoryId}/threads`, { title }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setTitle("");
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de la bulle" required />
            <button type="submit">Créer</button>
        </form>
    );
};