import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <p>&copy; {new Date().getFullYear()} NIRD. Tous droits réservés.</p>
                </div>
                <div className={styles.center}>
                    <a href="/mentions-legales">Mentions légales</a>
                    <a href="/politique-confidentialite">Politique de confidentialité</a>
                </div>
            </div>
        </footer>
    );
};