import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Formulaire.module.css";
import { ChampsFormulaire } from "./ChampsFormulaire";
import axios from "axios";

export const Connexion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            // Stocker token et utilisateur
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setError("");
            navigate("/"); // redirige vers l'accueil
        } catch (err) {
            setError(err.response?.data?.message || "Erreur inconnue");
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.back_btn} onClick={() => navigate(-1)}>
                ← Retour
            </button>

            <h1>Connexion</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <ChampsFormulaire
                    name="username"
                    placeholder="Identifiant"
                    value={formData.username}
                    onChange={handleChange}
                />
                <ChampsFormulaire
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label className={styles.checkbox}>
                    <input type="checkbox" />
                    Se souvenir de moi
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.submit_btn} type="submit">
                    Connexion
                </button>
            </form>

            <div className={styles.create_account}>
                Pas de compte ?  
                <Link to="/inscription" className={styles.link}>Créer un compte</Link>
            </div>
        </div>
    );
};