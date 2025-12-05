import React, { useState, useEffect, useRef } from "react";
import styles from "./snake.module.css";
import musiqueSnake from "./musique/tetris_off.mp3";
import musiqueManger from "./musique/manger_pomme.mp3";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiDeathSkull } from "react-icons/gi";
import { GiAngelWings } from "react-icons/gi";

export const Snake = () => {
  const sonMangerRef = useRef(new Audio(musiqueManger));

  const audioRef = useRef(null);
  const [musiqueEnLecture, setMusiqueEnLecture] = useState(false);
  const [hardcore, setHardcore] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleMusique = () => {
    if (!audioRef.current) return;

    if (musiqueEnLecture) {
      audioRef.current.pause();
      setMusiqueEnLecture(false);
    } else {
      audioRef.current.play();
      setMusiqueEnLecture(true);
    }
  };

  const tailleGrille = 20;
  const tailleGrilleHauteur = 28;
  const tailleGrilleLargeur = 20;

  const couleursTetris = [
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF",
  ];

  const [serpent, setSerpent] = useState([
    {
      position: [15, 7],
      couleur:
        couleursTetris[Math.floor(Math.random() * couleursTetris.length)],
    },
  ]);
  const directionRef = useRef([0, 1]);
  const [pomme, setPomme] = useState({
    position: [10, 5],
    couleur: couleursTetris[Math.floor(Math.random() * couleursTetris.length)],
  });

  const [perdu, setPerdu] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [score, setScore] = useState(0);
  const vitesse = 175;
  const [theme, setTheme] = useState("tetris");

  const reinitialiserJeu = () => {
    setSerpent([
      {
        position: [15, 7],
        couleur:
          couleursTetris[Math.floor(Math.random() * couleursTetris.length)],
      },
    ]);
    directionRef.current = [0, 1];
    setPomme({
      position: [10, 5],
      couleur:
        couleursTetris[Math.floor(Math.random() * couleursTetris.length)],
    });
    setPerdu(false);
    setEnCours(false);
    setScore(0);
  };

  const changerDirection = (e) => {
    const dir = directionRef.current;
    let flecheValide = false;

    switch (e.key) {
      case "ArrowUp":
      case "z":
      case "Z":
        if (!(dir[0] === 1)) {
          directionRef.current = [-1, 0];
          flecheValide = true;
        }
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (!(dir[0] === -1)) {
          directionRef.current = [1, 0];
          flecheValide = true;
        }
        break;
      case "ArrowLeft":
      case "q":
      case "Q":
        if (!(dir[1] === 1)) {
          directionRef.current = [0, -1];
          flecheValide = true;
        }
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (!(dir[1] === -1)) {
          directionRef.current = [0, 1];
          flecheValide = true;
        }
        break;
      default:
        break;
    }

    if (flecheValide && !enCours && !perdu) {
      setEnCours(true);
    }
  };

  const gererEntree = (e) => {
    if (e.key === "Enter") {
      reinitialiserJeu();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", gererEntree);
    return () => window.removeEventListener("keydown", gererEntree);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", changerDirection);
    return () => window.removeEventListener("keydown", changerDirection);
  }, [enCours, perdu]);

  const genererPomme = (etatSerpent) => {
    let x, y, collision;
    do {
      x = Math.floor(Math.random() * tailleGrilleHauteur);
      y = Math.floor(Math.random() * tailleGrilleLargeur);
      collision = etatSerpent.some(
        (s) => s.position[0] === x && s.position[1] === y
      );
    } while (collision);

    const couleurAleatoire =
      couleursTetris[Math.floor(Math.random() * couleursTetris.length)];
    setPomme({ position: [x, y], couleur: couleurAleatoire });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!enCours || perdu) return;

    const vitesseActuelle = hardcore ? 90 : vitesse;
    const id = setInterval(() => {
      setSerpent((prevSerpent) => {
        const dir = directionRef.current;
        const tete = prevSerpent[0];
        const nouvelleTetePos = [
          tete.position[0] + dir[0],
          tete.position[1] + dir[1],
        ];

        if (
          nouvelleTetePos[0] < 0 ||
          nouvelleTetePos[0] >= tailleGrilleHauteur ||
          nouvelleTetePos[1] < 0 ||
          nouvelleTetePos[1] >= tailleGrilleLargeur
        ) {
          setPerdu(true);
          return prevSerpent;
        }

        const collisionCorps = prevSerpent.some(
          (s) =>
            s.position[0] === nouvelleTetePos[0] &&
            s.position[1] === nouvelleTetePos[1]
        );
        if (collisionCorps) {
          setPerdu(true);
          return prevSerpent;
        }

        const mangePomme =
          nouvelleTetePos[0] === pomme.position[0] &&
          nouvelleTetePos[1] === pomme.position[1];

        const nouvelleTete = {
          position: nouvelleTetePos,
          couleur: mangePomme ? pomme.couleur : tete.couleur,
        };

        let nouveau = [nouvelleTete, ...prevSerpent];

        if (mangePomme) {
          try {
            sonMangerRef.current.currentTime = 0;
            sonMangerRef.current.play();
          } catch (e) {
          }

          genererPomme(nouveau);
          setScore((s) => s + 1);
        } else {
          nouveau.pop();
        }

        return nouveau;
      });
    }, vitesseActuelle);

    return () => clearInterval(id);
  }, [enCours, perdu, pomme, hardcore]);

  return (
    <div className={`${styles.conteneurJeu} ${styles[theme]}`}>
      {loading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingText}>LOADING...</div>
        </div>
      )}

      <div className={styles.topControls}>
        <button
          className={styles.boutonMusique}
          onClick={() => {
            toggleMusique();
            setMessage(musiqueEnLecture ? "Musique OFF" : "Musique ON");
            setTimeout(() => setMessage(""), 2000);
          }}
        >
          {musiqueEnLecture ? (
            <MdMusicOff size={40} />
          ) : (
            <MdMusicNote size={40} />
          )}
        </button>

        <button
          className={styles.boutonHardcore}
          onClick={() => {
            setHardcore(!hardcore);
            setMessage(!hardcore ? "Mode Hardcore ON !" : "Mode Normal ON !");
            setTimeout(() => setMessage(""), 2000);
          }}
          aria-label="Toggle hardcore"
        >
          {hardcore ? <GiDeathSkull size={40} /> : <GiAngelWings size={40} />}
        </button>
      </div>
      <Link to="/">
        <button className={styles.boutonRetour}>Revenir au site...</button>
      </Link>
      <div className={styles.titreGrille}>SNAKE !</div>
      {perdu && (
        <div className={styles.perdu}>
          Game Over !
          <div className={styles.recommencer}>Press "Enter" to restart</div>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src={musiqueSnake} type="audio/mp3" />
      </audio>
      <div className={styles.zoneJeu}>
        <div className={styles.score}>
          <span className={styles.scoretab}>Score :</span>
          <span className={styles.scoreValeur}>{score}</span>
        </div>
        {message && <div className={styles.message}>{message}</div>}
        <div className={styles.grille}>
          {Array.from({ length: tailleGrilleHauteur }).map((_, i) => (
            <div key={i} className={styles.ligne}>
              {Array.from({ length: tailleGrilleLargeur }).map((_, j) => {
                const segment = serpent.find(
                  (s) => s.position[0] === i && s.position[1] === j
                );
                const estSerpent = !!segment;
                const estPomme =
                  pomme.position[0] === i && pomme.position[1] === j;

                const styleCase = estPomme
                  ? { backgroundColor: pomme.couleur }
                  : estSerpent
                  ? { backgroundColor: segment.couleur }
                  : {};

                const classes = [styles.case, estPomme ? styles.pomme : ""]
                  .join(" ")
                  .trim();

                return <div key={j} className={classes} style={styleCase} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
