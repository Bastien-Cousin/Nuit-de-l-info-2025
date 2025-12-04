import React from "react";
import nird_logo from "../../img/nird_logo.png";
import styles from "./Header.module.css";
import { MdPerson } from "react-icons/md";

export const Header = () => {
    return (
        <div className={styles.header}>
            <img className={styles.nird_logo} src={nird_logo} alt="Logo de NIRD"/>
            <div className={styles.nav_links}>
                <span>Exemple1</span>
                <span>Exemple2</span>
                <span>Exemple3</span>
            </div>
            <div className={styles.login_container}>
                <button className={styles.icon_btn}>
                    <MdPerson />
                </button>

                <button className={styles.form_btn}>
                    Formulaire
                </button>
            </div>
        </div>
    )
}