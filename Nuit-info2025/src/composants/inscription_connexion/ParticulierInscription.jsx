import styles from "./Formulaire.module.css";
import { ChampsFormulaire } from "./ChampsFormulaire";

export const ParticulierInscription = () => {
    return (
        <div className={styles.container}>
            <h1>Inscription Particulier</h1>

            <form className={styles.form}>
                <ChampsFormulaire placeholder="Nom" />
                <ChampsFormulaire placeholder="Prénom" />
                <ChampsFormulaire type="email" placeholder="Email" />

                <label className={styles.checkbox}>
                    <input type="checkbox" required />
                    J’accepte les termes de confidentialité
                </label>

                <ChampsFormulaire placeholder="Identifiant" />
                <ChampsFormulaire type="password" placeholder="Mot de passe" />

                <button className={styles.submit_btn} type="submit">Créer mon compte</button>
            </form>
        </div>
    );
};