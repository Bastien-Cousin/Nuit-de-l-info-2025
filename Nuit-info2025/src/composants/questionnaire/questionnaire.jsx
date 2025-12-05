import React, { useState } from 'react'
import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';
import styles from './questionnaire.module.css';
import nird_logo from "../../img/nird_logo.png";

const defaultQuestions = [
  {
    id: 1,
    text: "Quelle est la couleur du ciel par temps clair ?",
    options: ["Bleu", "Vert", "Rouge", "Jaune"],
    correct: 0
  },
  {
    id: 2,
    text: "Combien y a-t-il de jours dans une semaine ?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    id: 3,
    text: "Quel est le résultat de 2 + 2 ?",
    options: ["3", "4", "5", "22"],
    correct: 1
  }
]

export const Questionnaire = () => {
  const [questions] = useState(defaultQuestions)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleChange = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let s = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) s += 1
    })
    setScore(s)
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const allAnswered = questions.every(q => answers[q.id] !== undefined)

  return (
    <div>
      <Header />

      <main className={styles.container}>
        <img src={nird_logo} alt="Logo" className={styles.logo} />

        <h1 className={styles.title}>Questionnaire (QCM)</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {questions.map(q => (
            <div key={q.id} className={styles.questionCard}>
              <p className={styles.questionText}>{q.id}. {q.text}</p>

              <div className={styles.options}>
                {q.options.map((opt, idx) => (
                  <label key={idx} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={idx}
                      checked={answers[q.id] === idx}
                      onChange={() => handleChange(q.id, idx)}
                    />
                    <span className={styles.optionText}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.controls}>
            <button type="submit" className={styles.submitBtn} disabled={!allAnswered}>Valider</button>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>Réinitialiser</button>
          </div>
        </form>

        {submitted && (
          <div className={styles.result}>
            <p>Votre score : <strong>{score} / {questions.length}</strong></p>
            <ul>
              {questions.map(q => (
                <li key={q.id} className={styles.resultItem}>
                  <span className={styles.resultQuestion}>{q.text} — </span>
                  <span>
                    Votre réponse: <strong>{q.options[answers[q.id]] ?? 'Aucune'}</strong>
                    &nbsp;|&nbsp; Bonne réponse: <strong>{q.options[q.correct]}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}