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
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                </div>
            </div>
        </footer>
    );
};