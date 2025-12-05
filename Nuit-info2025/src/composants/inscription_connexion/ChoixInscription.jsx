import styles from "./Formulaire.module.css";
import { Link } from "react-router-dom";

export const ChoixInscription = () => {
    return (
        <div className={styles.container}>
            <h1>Créer un compte</h1>

            <div className={styles.choice_wrapper}>
                <Link to="/inscription/particulier" className={styles.choice_card}>
                    Particulier
                </Link>

                <Link to="/inscription/organisation" className={styles.choice_card}>
                    Organisation
                </Link>

                <Link to="/inscription/entreprise" className={styles.choice_card}>
                    Entreprise
                </Link>
            </div>
        </div>
    );
};