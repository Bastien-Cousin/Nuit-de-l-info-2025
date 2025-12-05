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
            <p className={styles.paraAccroche}>
              Vous allez, à travers 3 mini-jeux, découvrir ce que l'on fait au NIRD, avec le matériel
              informatique que l'on recupère, remet en état et redistribue dans les établissements scolaires.
              Chaque mini-jeux vous apprendra quelque chose sur notre démarche et nos actions au quotidien pour que vous soyez, en 
              bas de cette page, des experts du Numérique résponsable et durable.
            </p>
          </div>
      </div>
      <Footer />
    </div>
  );
};
