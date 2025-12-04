import styles from "./Formulaire.module.css";

export const ChampsFormulaire = ({ type = "text", placeholder, required = true }) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            required={required}
        />
    );
};