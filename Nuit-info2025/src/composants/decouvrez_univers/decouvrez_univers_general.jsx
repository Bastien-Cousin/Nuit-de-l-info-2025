import { Header } from "../header/Header.jsx";
import { Footer } from "../footer/Footer.jsx";
import styles from "./decouvrez_univers_general.module.css";
import { Link } from "react-router-dom";

export const DecouvrezUniversGeneral = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sectionAccroche}>
            <h1 className={styles.titreAccroche}>
              Découvrez notre univers à travers plusieurs mini-jeux intéractifs !
            </h1>
            <p>
              Vous allez, à travers 3 mini-jeux, découvrir ce que l'on fait au NIRD, avec le matériel
              informatique que l'on recupère, remet en état et redistribue dans les établissements scolaires.
            </p>
            <button>
              <Link to="/qui-sommes-nous">Nous découvrir...</Link>
            </button>
          </div>
      </div>
      <Footer />
    </div>
  );
};
