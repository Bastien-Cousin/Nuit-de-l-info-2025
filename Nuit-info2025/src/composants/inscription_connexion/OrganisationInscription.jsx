import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Formulaire.module.css";
import { ChampsFormulaire } from "./ChampsFormulaire";
import { signup } from "../api/auth";

export const OrganisationInscription = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "organisation",
        nom: "",
        adresse: "",
        ville: "",
        email: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            navigate("/connexion");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Inscription Organisation</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <ChampsFormulaire name="nom" placeholder="Nom de l'organisation" value={formData.nom} onChange={handleChange} />
                <ChampsFormulaire name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} />
                <ChampsFormulaire name="ville" placeholder="Ville" value={formData.ville} onChange={handleChange} />
                <ChampsFormulaire type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <label className={styles.checkbox}>
                    <input type="checkbox" required />
                    J’accepte les termes de confidentialité
                </label>
                <ChampsFormulaire name="username" placeholder="Identifiant" value={formData.username} onChange={handleChange} />
                <ChampsFormulaire type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
                <button className={styles.submit_btn} type="submit">Créer un compte</button>
            </form>
        </div>
    );
};