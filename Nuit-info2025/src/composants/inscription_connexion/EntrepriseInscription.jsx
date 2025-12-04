import styles from "./Formulaire.module.css";
import { ChampsFormulaire } from "./ChampsFormulaire";

export const EntrepriseInscription = () => {
    return (
        <div className={styles.container}>
            <h1>Inscription Entreprise</h1>

            <form className={styles.form}>
                <ChampsFormulaire placeholder="Nom de l'entreprise" />
                <ChampsFormulaire placeholder="Adresse" />
                <ChampsFormulaire placeholder="Ville" />
                <ChampsFormulaire type="email" placeholder="Email" />

                <label className={styles.checkbox}>
                    <input type="checkbox" required />
                    J’accepte les termes de confidentialité
                </label>

                <ChampsFormulaire placeholder="Identifiant" />
                <ChampsFormulaire type="password" placeholder="Mot de passe" />

                <button className={styles.submit_btn} type="submit">Créer un compte</button>
            </form>
        </div>
    );
};