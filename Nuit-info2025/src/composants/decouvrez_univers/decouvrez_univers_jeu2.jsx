import styles from "./decouvrez_univers_jeu2.module.css";
import { useState } from "react";

const qcmQuestions = [
  {
    id: 1,
    question: "Quelle est la capitale de la France ?",
    options: ["Londres", "Paris", "Berlin", "Madrid"],
    correct: 1
  },
  {
    id: 2,
    question: "En quelle année l'homme a-t-il marché sur la Lune ?",
    options: ["1969", "1972", "1965", "1975"],
    correct: 0
  },
  {
    id: 3,
    question: "Quel est le plus haut sommet du monde ?",
    options: ["Everest", "K2", "Kangchenjunga", "Denali"],
    correct: 0
  },
  {
    id: 4,
    question: "Combien de continents y a-t-il ?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    id: 5,
    question: "Quel élément chimique a le symbole 'Au' ?",
    options: ["Argent", "Aluminium", "Or", "Arsenic"],
    correct: 2
  },
  {
    id: 6,
    question: "Qui est le meilleur joueur de CS2 ?",
    options: ["ZywoO", "Donk", "KennyS", "M0nesy"],
    correct: 0
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
