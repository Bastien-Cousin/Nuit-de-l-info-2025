import styles from "./Formulaire.module.css";
import { ChampsFormulaire } from "./ChampsFormulaire";
import { Link, useNavigate } from "react-router-dom";

export const Connexion = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            
            <button className={styles.back_btn} onClick={() => navigate(-1)}>
                ← Retour
            </button>

            <h1>Connexion</h1>

            <form className={styles.form}>
                <ChampsFormulaire placeholder="Identifiant" />
                <ChampsFormulaire type="password" placeholder="Mot de passe" />

                <label className={styles.checkbox}>
                    <input type="checkbox" />
                    Se souvenir de moi
                </label>

                <button className={styles.submit_btn} type="submit">Connexion</button>
            </form>

            <div className={styles.create_account}>
                Pas de compte ?  
                <Link to="/inscription" className={styles.link}>Créer un compte</Link>
            </div>
        </div>
    );
};