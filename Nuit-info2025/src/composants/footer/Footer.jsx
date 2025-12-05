import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <p>&copy; {new Date().getFullYear()} NIRD. Tous droits réservés.</p>
                </div>
                <div className={styles.center}>
                    <Link to="/mentions-legales" className={styles.link}>Mentions légales</Link>
                    {" | "}
                    <Link to="/politique-confidentialite" className={styles.link}>Politique de confidentialité</Link>
                </div>
            </div>
        </footer>
    );
};