import styles from "./decouvrez_univers_jeu2.module.css";
import { useState } from "react";

const qcmQuestions = [
  {
    id: 1,
    question: "Quel est le système d'exploitation le plus libre ?",
    options: ["MacOS", "Windows", "Linux", "SteamOS"],
    correct: 1
  },
  {
    id: 2,
    question: "Le reconditionnement d’un ordinateur consiste principalement à :",
    options: ["Ajouter de nouveaux composants ultra-performants", 
      "Remettre en état des PC usagés en effaçant les données, réparant le matériel et réinstallant un système", 
      "Surveiller l’utilisation des ordinateurs par les élèves", 
      "Transformer les ordinateurs en objets décoratifs"],
    correct: 1
  },
  {
    id: 3,
    question: "Pourquoi Linux est-il souvent utilisé dans le reconditionnement ?",
    options: ["Parce qu’il est payant et garantit un meilleur revenu pour l’établissement", 
      "Parce qu’il est facile à pirater", 
      "Parce que c’est un système d’exploitation libre et adapté aux usages éducatifs", 
      "Parce qu’il ne fonctionne que sur les ordinateurs récents"],
    correct: 2
  },
  {
    id: 4,
    question: "Quel est un des bénéfices pédagogiques majeurs du reconditionnement par les élèves ?",
    options: ["Apprendre à utiliser uniquement des logiciels propriétaires", 
      "Réaliser des tâches répétitives sans apprendre de nouvelles compétences", 
      "Développer des compétences techniques réelles en démontant, testant et réparant des PC", 
      "Remplacer les techniciens informatiques de l’établissement"],
    correct: 2
  },
  {
    id: 5,
    question: "Quelle pratique est indispensable pour garantir la protection des données lors du reconditionnement ?",
    options: ["Stocker les fichiers des anciens utilisateurs sur un disque externe", 
      "Garder les comptes existants pour gagner du temps", 
      "Effacer de manière sécurisée toutes les données des anciens utilisateurs", 
      "Débrancher simplement le disque dur sans rien vérifier"],
    correct: 2
  },
  {
    id: 6,
    question: "En quoi le reconditionnement contribue-t-il à une démarche de développement durable ?",
    options: ["En augmentant la quantité de déchets électroniques", 
      "En obligeant les établissements à acheter plus de matériel", 
      "En prolongeant la durée de vie des machines et en réduisant les déchets numériques", 
      "En remplaçant systématiquement les pièces encore fonctionnelles"],
    correct: 2
  }
];

export const DecouvrezUniversJeu2 = () => {
  const [questions] = useState(qcmQuestions);
  const [answers, setAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState(new Set());

  const handleSelectAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCheckAnswer = (questionId) => {
    setCheckedAnswers(prev => new Set([...prev, questionId]));
  };

  const handleReset = () => {
    setAnswers({});
    setCheckedAnswers(new Set());
  };

  const isCorrect = (question) => answers[question.id] === question.correct;

  return (
    <div>
     <main className={styles.container}>
        <h1 className={styles.title}>Jeu QCM - Découvrez l'univers</h1>
        <p className={styles.subtitle}>Sélectionnez une réponse pour chaque question et validez-la</p>

        <div className={styles.cardsGrid}>
          {questions.map(q => (
            <div key={q.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Question {q.id}</h2>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.question}>{q.question}</p>

                <div className={styles.optionsContainer}>
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`${styles.optionBtn} ${
                        answers[q.id] === idx ? styles.selected : ""
                      } ${
                        checkedAnswers.has(q.id) && answers[q.id] === idx
                          ? isCorrect(q)
                            ? styles.correct
                            : styles.incorrect
                          : ""
                      }`}
                      onClick={() => handleSelectAnswer(q.id, idx)}
                      disabled={checkedAnswers.has(q.id)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {checkedAnswers.has(q.id) && (
                  <div className={`${styles.feedback} ${isCorrect(q) ? styles.feedbackSuccess : styles.feedbackError}`}>
                    {isCorrect(q) ? (
                      <p>✓ Bonne réponse !</p>
                    ) : (
                      <p>✗ Mauvaise réponse. La réponse correcte est : <strong>{q.options[q.correct]}</strong></p>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.cardFooter}>
                {!checkedAnswers.has(q.id) ? (
                  <button
                    className={styles.validateBtn}
                    onClick={() => handleCheckAnswer(q.id)}
                    disabled={answers[q.id] === undefined}
                  >
                    Valider
                  </button>
                ) : (
                  <span className={styles.validated}>Validé</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Recommencer
          </button>
        </div>
      </main>
    </div>
  );
};
