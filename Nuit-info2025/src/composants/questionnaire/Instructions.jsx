import React from "react";

export const Instructions = ({ formData }) => {
  const genererInstructionsProfil = () => {
    const instructions = [];

    // Niveau sportif
    if (formData.niveau === "Débutant") {
      instructions.push("Commencez par des mouvements simples et contrôlés. Privilégiez la qualité du mouvement à l’intensité.");
    }
    if (formData.niveau === "Intermédiaire") {
      instructions.push("Ajoutez des variations plus difficiles pour progresser, tout en conservant une technique propre.");
    }
    if (formData.niveau === "Avancé") {
      instructions.push("Travaillez la profondeur des mouvements et augmentez les charges progressivement pour maximiser vos performances.");
    }

    // Objectifs
    if (formData.objectifs?.includes("Prise de masse")) {
      instructions.push("Privilégiez les exercices poly-articulaires comme les squats et les pompes avec un tempo lent.");
    }
    if (formData.objectifs?.includes("Perte de poids")) {
      instructions.push("Pratiquez des séries plus longues avec peu de repos, ou des circuits (HIIT).");
    }
    if (formData.objectifs?.includes("Souplesse / mobilité")) {
      instructions.push("Ajoutez des étirements dynamiques avant les séances et des postures de yoga en fin de séance.");
    }
    if (formData.objectifs?.includes("Endurance / cardio")) {
      instructions.push("Enchaînez les mouvements avec peu de repos : pompes → squats → gainage.");
    }
    if (formData.objectifs?.includes("Bien-être général")) {
      instructions.push("Optez pour des séances douces mais régulières, incluant des exercices de respiration.");
    }

    // Blessures
    if (formData.blessures === "Genoux/Articulations") {
      instructions.push("Limitez les flexions profondes et préférez les squats à amplitude réduite.");
    }
    if (formData.blessures === "Dos/Colonne vertébrale") {
      instructions.push("Gardez toujours un dos droit et évitez les flexions lombaires. Le gainage est votre allié.");
    }
    if (formData.blessures === "Épaules/Bras") {
      instructions.push("Gardez les coudes près du corps pendant les pompes pour limiter la pression sur les épaules.");
    }

    // Fréquence
    if (formData.frequence === "1-2 fois") {
      instructions.push("Choisissez des séances full-body pour maximiser les résultats.");
    }
    if (formData.frequence === "3-4 fois") {
      instructions.push("Alternez haut du corps / bas du corps pour favoriser une meilleure récupération.");
    }
    if (formData.frequence === "5 fois ou plus") {
      instructions.push("Ajoutez une séance de mobilité pour éviter le surentraînement.");
    }

    // Durée des séances
    if (formData.dureeSeance === "Courtes et intenses") {
      instructions.push("Utilisez du HIIT : 20 secondes d’effort / 10 secondes de repos.");
    }
    if (formData.dureeSeance === "Moyennes") {
      instructions.push("Structure idéale : 5 min échauffement – 25 min exercices – 10 min étirements.");
    }
    if (formData.dureeSeance === "Longues et progressives") {
      instructions.push("Prenez le temps d’exécuter chaque mouvement avec contrôle, avec 1 min de repos entre les séries.");
    }

    return instructions;
  };

  const instructions = genererInstructionsProfil();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vos Instructions Personnalisées</h2>

      {instructions.length === 0 ? (
        <p>Aucune donnée trouvée.</p>
      ) : (
        <ul>
          {instructions.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
};