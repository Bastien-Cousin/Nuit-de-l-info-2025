import { useState } from "react";
import styles from "./decouvrez_univers_jeu1.module.css";

export const DecouvrezUniversJeu1 = () => {
  const mots = ["Responsabilité", "Inclusion", "Reconditionnement", "Linux"];
  const phrases = [
    "accès équitable au numérique, réduction de la fracture numérique...",
    "usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles…",
    "Un système d'exploitation Open Source créé par Linus Torvalds en 1991.",
    "le processus de remise en état d'ordinateurs non-neufs pour leur donner une seconde vie, tout en garantissant leur bon fonctionnement et leur conformité aux besoins des utilisateurs.",
  ];

  const reponses = {
    Responsabilité:
      "usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles…",
    Inclusion:
      "accès équitable au numérique, réduction de la fracture numérique...",
    Reconditionnement:
      "le processus de remise en état d'ordinateurs non-neufs pour leur donner une seconde vie, tout en garantissant leur bon fonctionnement et leur conformité aux besoins des utilisateurs.",
    Linux:
      "Un système d'exploitation Open Source créé par Linus Torvalds en 1991.",
  };

  const [motSelectionne, setMotSelectionne] = useState(null);
  const [etatPhrases, setEtatPhrases] = useState({});
  const [motsTrouves, setMotsTrouves] = useState({});
  const [phrasesTrouvees, setPhrasesTrouvees] = useState({});

  const handlePhraseSelect = (phrase) => {
    if (!motSelectionne) return;
    if (motsTrouves[motSelectionne] || phrasesTrouvees[phrase]) return;

    if (reponses[motSelectionne] === phrase) {
      setEtatPhrases((prev) => ({ ...prev, [phrase]: "correct" }));
      setMotsTrouves((prev) => ({ ...prev, [motSelectionne]: true }));
      setPhrasesTrouvees((prev) => ({ ...prev, [phrase]: true }));
      setMotSelectionne(null);
    } else {
      setEtatPhrases((prev) => ({ ...prev, [phrase]: "wrong" }));
      setTimeout(() => {
        setEtatPhrases((prev) => {
          const copie = { ...prev };
          delete copie[phrase];
          return copie;
        });
      }, 800);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titreAccroche}>Relie le mot à sa bonne phrase !</h1>
      <p className={styles.paraAccroche}>
        Clique sur un mot dans la colonne de gauche, puis sélectionne sa phrase
        correspondante.
      </p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mots</th>
            <th>Phrases</th>
          </tr>
        </thead>
        <tbody>
          {mots.map((mot, index) => {
            const phrase = phrases[index];
            const etatPhrase = etatPhrases[phrase];
            const motEstTrouve = !!motsTrouves[mot];
            const phraseEstTrouvee = !!phrasesTrouvees[phrase];

            return (
              <tr key={mot}>
                <td className={styles.cell}>
                  <button
                    className={`${styles.button} ${
                      motEstTrouve ? styles.correct : ""
                    } ${motSelectionne === mot ? styles.selected : ""}`}
                    onClick={() => {
                      if (motEstTrouve) return;
                      setMotSelectionne(mot);
                    }}
                    disabled={motEstTrouve}
                  >
                    {mot}
                  </button>
                </td>
                <td className={styles.cell}>
                  <button
                    className={`${styles.button} ${
                      etatPhrase === "correct" ? styles.correct : ""
                    } ${etatPhrase === "wrong" ? styles.wrong : ""}`}
                    disabled={phraseEstTrouvee}
                    onClick={() => {
                      if (phraseEstTrouvee) return;
                      handlePhraseSelect(phrase);
                    }}
                  >
                    {phrase}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
