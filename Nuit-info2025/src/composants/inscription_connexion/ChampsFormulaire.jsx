import styles from "./Formulaire.module.css";

export const ChampsFormulaire = ({ type = "text", placeholder, name, value, onChange, required = true }) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
};