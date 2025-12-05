import React from "react";
import styles from "./Instructions.module.css";

export const Instructions = ({ formData }) => {

  // Objet contenant toutes les instructions
  const instructionsMap = {
    niveau: {
      "Débutant": "Commencez par des mouvements simples et contrôlés. Privilégiez la qualité du mouvement à l’intensité.",
      "Intermédiaire": "Ajoutez des variations plus difficiles pour progresser, tout en conservant une technique propre.",
      "Avancé": "Travaillez la profondeur des mouvements et augmentez les charges progressivement pour maximiser vos performances."
    },
    objectifs: {
      "Prise de masse": "Privilégiez les exercices poly-articulaires comme les squats et les pompes avec un tempo lent.",
      "Perte de poids": "Pratiquez des séries plus longues avec peu de repos, ou des circuits (HIIT).",
      "Souplesse / mobilité": "Ajoutez des étirements dynamiques avant les séances et des postures de yoga en fin de séance.",
      "Endurance / cardio": "Enchaînez les mouvements avec peu de repos : pompes → squats → gainage.",
      "Bien-être général": "Optez pour des séances douces mais régulières, incluant des exercices de respiration."
    },
    blessures: {
      "Genoux/Articulations": "Limitez les flexions profondes et préférez les squats à amplitude réduite.",
      "Dos/Colonne vertébrale": "Gardez toujours un dos droit et évitez les flexions lombaires. Le gainage est votre allié.",
      "Épaules/Bras": "Gardez les coudes près du corps pendant les pompes pour limiter la pression sur les épaules.",
      "Aucune": "Aucune restriction particulière à prendre en compte."
    },
    frequence: {
      "1-2 fois": "Choisissez des séances full-body pour maximiser les résultats.",
      "3-4 fois": "Alternez haut du corps / bas du corps pour favoriser une meilleure récupération.",
      "5 fois ou plus": "Ajoutez une séance de mobilité pour éviter le surentraînement."
    },
    dureeSeance: {
      "Courtes et intenses": "Utilisez du HIIT : 20 secondes d’effort / 10 secondes de repos.",
      "Moyennes": "Structure idéale : 5 min échauffement – 25 min exercices – 10 min étirements.",
      "Longues et progressives": "Prenez le temps d’exécuter chaque mouvement avec contrôle, avec 1 min de repos entre les séries."
    }
  };

  // Générer les instructions à partir de formData
  const genererInstructionsProfil = () => {
    const instructions = [];

    // Niveau
    if (formData.niveau && instructionsMap.niveau[formData.niveau]) {
      instructions.push(instructionsMap.niveau[formData.niveau]);
    }

    // Objectifs (multi-checkbox)
    formData.objectifs?.forEach(obj => {
      if (instructionsMap.objectifs[obj]) instructions.push(instructionsMap.objectifs[obj]);
    });

    // Blessures
    if (formData.blessures && instructionsMap.blessures[formData.blessures]) {
      instructions.push(instructionsMap.blessures[formData.blessures]);
    }

    // Fréquence
    if (formData.frequence && instructionsMap.frequence[formData.frequence]) {
      instructions.push(instructionsMap.frequence[formData.frequence]);
    }

    // Durée des séances
    if (formData.dureeSeance && instructionsMap.dureeSeance[formData.dureeSeance]) {
      instructions.push(instructionsMap.dureeSeance[formData.dureeSeance]);
    }

    return instructions;
  };

  const instructions = genererInstructionsProfil();

  return (
    <div>
      <h2 className={styles.instructionsTitle}>Vos Instructions Personnalisées</h2>

      {instructions.length === 0 ? (
        <p>Aucune donnée trouvée.</p>
      ) : (
        <div>
          {instructions.map((text, i) => (
            <div key={i} className={styles.instructionsCard}>
              <p className={styles.instructionsText}>{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};