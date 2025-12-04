import React, { useState } from "react";
import nird_logo from "../../img/nird_logo.png";
import styles from "./Header.module.css";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/connexion");
    };

    return (
        <div className={styles.header}>
            <Link to="/"><img className={styles.nird_logo} src={nird_logo} alt="Logo de NIRD" /></Link>

            <div className={styles.nav_links}>
                <Link to="/qui-sommes-nous">Qui sommes nous ?</Link>
                <span>Exemple2</span>
                <Link to="/forum">Forum</Link>
            </div>

            <div className={styles.login_container}>
                <button className={styles.form_btn}>
                    Formulaire
                </button>
                
                {user ? (
                    <div 
                        className={styles.user_container} 
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className={styles.welcome}>Bienvenue {user.username}</span>
                        {dropdownOpen && (
                            <div className={styles.dropdown}>
                                <button onClick={() => navigate("/profil")}>Profil</button>
                                <button onClick={handleLogout}>Se déconnecter</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        className={styles.icon_btn}
                        onClick={() => navigate("/connexion")}
                    >
                        <MdPerson />
                    </button>
                )}
            </div>
        </div>
    );
};