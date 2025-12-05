import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Instructions } from "./Instructions";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import styles from "./Instructions.module.css"; // CSS importé comme module

export const InstructionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <>
        <Header />
        <div className={styles.instructionsError}>
          <h2>Aucun profil détecté ❌</h2>
          <p>Veuillez remplir votre questionnaire d'abord.</p>
          <button onClick={() => navigate("/questionnaire")}>
            Retour au questionnaire
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.instructionsPageContainer}>
        <Instructions formData={formData} />
      </div>
      <Footer />
    </>
  );
};