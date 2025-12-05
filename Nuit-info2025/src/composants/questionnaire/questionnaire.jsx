import React, { useState } from "react";
import "./questionnaire.module.css";
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

  const [showInstructions, setShowInstructions] = useState(false);

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

    navigate("/instructions", {
      state: { formData }
    });
  };

  return (
    <>
      <Header />

      <form onSubmit={handleSubmit}>
        <h2>Profil Sportif</h2>

        {/* Question 1 */}
        <p>1. Quel est votre niveau sportif général ?</p>
        <label><input type="radio" name="niveau" value="Débutant" onChange={handleChange} /> Débutant</label>
        <label><input type="radio" name="niveau" value="Intermédiaire" onChange={handleChange} /> Intermédiaire</label>
        <label><input type="radio" name="niveau" value="Avancé" onChange={handleChange} /> Avancé</label>

        {/* Question 2 */}
        <p>2. Quels sports pratiquez-vous régulièrement ?</p>
        {["Course à pied", "Musculation", "Yoga/Pilates", "Natation", "Sports collectifs", "Autres"].map((sport) => (
          <label key={sport}>
            <input type="checkbox" name="sports" value={sport} onChange={handleChange} /> {sport}
          </label>
        ))}

        {/* Question 3 */}
        <p>3. Quels sont vos objectifs principaux ?</p>
        {["Prise de masse", "Perte de poids", "Souplesse / mobilité", "Endurance / cardio", "Bien-être général"].map((objectif) => (
          <label key={objectif}>
            <input type="checkbox" name="objectifs" value={objectif} onChange={handleChange} /> {objectif}
          </label>
        ))}

        {/* Question 4 */}
        <p>4. Avez-vous déjà eu des blessures ou douleurs récurrentes ?</p>
        <label><input type="radio" name="blessures" value="Genoux/Articulations" onChange={handleChange} /> Genoux / articulations</label>
        <label><input type="radio" name="blessures" value="Dos/Colonne vertébrale" onChange={handleChange} /> Dos / colonne vertébrale</label>
        <label><input type="radio" name="blessures" value="Épaules/Bras" onChange={handleChange} /> Épaules / bras</label>
        <label><input type="radio" name="blessures" value="Aucune" onChange={handleChange} /> Aucune</label>

        {/* Question 5 */}
        <p>5. Combien de fois par semaine souhaitez-vous vous entraîner ?</p>
        <label><input type="radio" name="frequence" value="1-2 fois" onChange={handleChange} /> 1-2 fois</label>
        <label><input type="radio" name="frequence" value="3-4 fois" onChange={handleChange} /> 3-4 fois</label>
        <label><input type="radio" name="frequence" value="5 fois ou plus" onChange={handleChange} /> 5 fois ou plus</label>

        {/* Question 6 */}
        <p>6. Préférez-vous des séances :</p>
        <label><input type="radio" name="dureeSeance" value="Courtes et intenses" onChange={handleChange} /> Courtes et intenses (15-30 min)</label>
        <label><input type="radio" name="dureeSeance" value="Moyennes" onChange={handleChange} /> Moyennes (30-45 min)</label>
        <label><input type="radio" name="dureeSeance" value="Longues et progressives" onChange={handleChange} /> Longues et progressives (45-60 min ou plus)</label>

        <br /><br />
        <button type="submit">Générer mes instructions</button>
      </form>

      <Footer />
    </>
  );
};