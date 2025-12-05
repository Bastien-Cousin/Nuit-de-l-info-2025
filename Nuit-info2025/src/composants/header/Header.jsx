import React, { useState, useRef, useEffect } from "react";
import nird_logo from "../../img/nird_logo.png";
import styles from "./Header.module.css";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";

export const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/connexion");
    };

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.header}>
            <Link to="/"><img className={styles.nird_logo} src={nird_logo} alt="Logo de NIRD" /></Link>

            <div className={styles.nav_links}>
                <Link to="/qui-sommes-nous">Qui sommes nous ?</Link>
                <Link to="/decouvrez_univers_page1">Découvrez notre univers</Link>
                <Link to="/forum">Forum</Link>
            </div>

            <div className={styles.login_container}>
                <button className={styles.form_btn}>
                    <Link to="/questionnaire">
                        <FaWpforms />
                    </Link>
                </button>
                
                {user ? (
                    <div className={styles.user_container} ref={dropdownRef}>
                        <span className={styles.welcome} onClick={() => setDropdownOpen(!dropdownOpen)}>
                            Bienvenue {user.username}
                        </span>
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