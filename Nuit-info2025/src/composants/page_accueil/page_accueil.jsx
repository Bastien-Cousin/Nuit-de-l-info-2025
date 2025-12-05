import { Header } from "../header/Header.jsx";
import { Footer } from "../footer/Footer.jsx";
import styles from "./page_accueil.module.css";
import nird_logo from "../../img/nird_logo.png";
import { Link } from "react-router-dom";

export const PageAccueil = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sectionAccroche}>
          <img
            className={`${styles.nirdLogo} ${styles.flotte}`}
            src={nird_logo}
            alt="Logo NIRD"
          />

          <div className={styles.parabienvenue}>
            <h1 className={styles.titreAccroche}>
              Pour un numérique libre et écocitoyen dans les établissements
              scolaires !
            </h1>
            <p>
              À l’heure où la fin du support de Windows 10 nous rappelle notre
              dépendance technologique et nous oblige à faire des choix, un
              collectif enseignant issu de la forge des communs numériques
              éducatifs invite les établissements scolaires et les collectivités
              qui les accompagnent à s’engager progressivement vers un Numérique
              qui soit davantage Inclusif, Responsable et Durable, en rejoignant
              la « démarche NIRD  ».
            </p>
            <button>
              <Link to="/qui-sommes-nous">Nous découvrir</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
