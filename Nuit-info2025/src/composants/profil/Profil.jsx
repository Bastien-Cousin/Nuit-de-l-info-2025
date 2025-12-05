import React, { useState } from "react";
import styles from "./Profil.module.css";
import { getProfile, updateProfile } from "../api/auth";

export const Profil = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data);
                setFormData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateProfile(formData);
            setUser(updated);
            setMessage("Profil mis à jour avec succès !");
            setEditMode(false);
        } catch (err) {
            console.error(err);
            setMessage("Erreur lors de la mise à jour.");
        }
    };

    if (loading) return <p className={styles.loading}>Chargement...</p>;
    if (!user) return <p className={styles.error}>Utilisateur non trouvé</p>;

    return (
        <div className={styles.container}>
            <h1>Mon Profil</h1>
            {message && <p className={styles.message}>{message}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Nom :</label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                <label>Prénom :</label>
                <input
                    type="text"
                    name="prenom"
                    value={formData.prenom || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                <label>Email :</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                <label>Identifiant :</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                <label>Adresse :</label>
                <input
                    type="text"
                    name="adresse"
                    value={formData.adresse || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                <label>Ville :</label>
                <input
                    type="text"
                    name="ville"
                    value={formData.ville || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                />

                {editMode ? (
                    <div className={styles.buttons}>
                        <button type="submit">Enregistrer</button>
                        <button type="button" onClick={() => { setFormData(user); setEditMode(false); }}>Annuler</button>
                    </div>
                ) : (
                    <button type="button" onClick={() => setEditMode(true)}>Modifier mon profil</button>
                )}
            </form>
        </div>
    );
};