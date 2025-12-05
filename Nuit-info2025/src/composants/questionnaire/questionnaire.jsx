import React, { useState } from "react";
import styles from "./questionnaire.module.css";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { useNavigate } from "react-router-dom";

export const Questionnaire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    niveau: "",
    sports: [],
    objectifs: [],
    blessures: "",
    frequence: "",
    dureeSeance: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedArray = [...formData[name]];
      if (checked) {
        updatedArray.push(value);
      } else {
        updatedArray = updatedArray.filter((v) => v !== value);
      }
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/instructions", { state: { formData } });
  };

  return (
    <>
      <Header />

      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.title}>Profil Sportif</h2>

          {/* Question 1 */}
          <p className={styles.question}>1. Quel est votre niveau sportif général ?</p>
          <label className={styles.label}>
            <input type="radio" name="niveau" value="Débutant" onChange={handleChange} /> Débutant
          </label>
          <label className={styles.label}>
            <input type="radio" name="niveau" value="Intermédiaire" onChange={handleChange} /> Intermédiaire
          </label>
          <label className={styles.label}>
            <input type="radio" name="niveau" value="Avancé" onChange={handleChange} /> Avancé
          </label>

          {/* Question 2 */}
          <p className={styles.question}>2. Quels sports pratiquez-vous régulièrement ?</p>
          {["Course à pied", "Musculation", "Yoga/Pilates", "Natation", "Sports collectifs", "Autres"].map((sport) => (
            <label key={sport} className={styles.label}>
              <input type="checkbox" name="sports" value={sport} onChange={handleChange} /> {sport}
            </label>
          ))}

          {/* Question 3 */}
          <p className={styles.question}>3. Quels sont vos objectifs principaux ?</p>
          {["Prise de masse", "Perte de poids", "Souplesse / mobilité", "Endurance / cardio", "Bien-être général"].map((objectif) => (
            <label key={objectif} className={styles.label}>
              <input type="checkbox" name="objectifs" value={objectif} onChange={handleChange} /> {objectif}
            </label>
          ))}

          {/* Question 4 */}
          <p className={styles.question}>4. Avez-vous déjà eu des blessures ou douleurs récurrentes ?</p>
          <label className={styles.label}>
            <input type="radio" name="blessures" value="Genoux/Articulations" onChange={handleChange} /> Genoux / articulations
          </label>
          <label className={styles.label}>
            <input type="radio" name="blessures" value="Dos/Colonne vertébrale" onChange={handleChange} /> Dos / colonne vertébrale
          </label>
          <label className={styles.label}>
            <input type="radio" name="blessures" value="Épaules/Bras" onChange={handleChange} /> Épaules / bras
          </label>
          <label className={styles.label}>
            <input type="radio" name="blessures" value="Aucune" onChange={handleChange} /> Aucune
          </label>

          {/* Question 5 */}
          <p className={styles.question}>5. Combien de fois par semaine souhaitez-vous vous entraîner ?</p>
          <label className={styles.label}>
            <input type="radio" name="frequence" value="1-2 fois" onChange={handleChange} /> 1-2 fois
          </label>
          <label className={styles.label}>
            <input type="radio" name="frequence" value="3-4 fois" onChange={handleChange} /> 3-4 fois
          </label>
          <label className={styles.label}>
            <input type="radio" name="frequence" value="5 fois ou plus" onChange={handleChange} /> 5 fois ou plus
          </label>

          {/* Question 6 */}
          <p className={styles.question}>6. Préférez-vous des séances :</p>
          <label className={styles.label}>
            <input type="radio" name="dureeSeance" value="Courtes et intenses" onChange={handleChange} /> Courtes et intenses (15-30 min)
          </label>
          <label className={styles.label}>
            <input type="radio" name="dureeSeance" value="Moyennes" onChange={handleChange} /> Moyennes (30-45 min)
          </label>
          <label className={styles.label}>
            <input type="radio" name="dureeSeance" value="Longues et progressives" onChange={handleChange} /> Longues et progressives (45-60 min ou plus)
          </label>

          <button type="submit" className={styles.submitButton}>Générer mes instructions</button>
        </form>
      </div>

      <Footer />
    </>
  );
};