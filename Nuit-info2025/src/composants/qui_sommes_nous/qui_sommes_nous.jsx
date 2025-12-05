import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';
import styles from './qui_sommes_nous.module.css';
import presentation from "../../img/presentation.svg";
import qui_sommes_nous from "../../img/qui_sommes_nous.png";
import qui_sommes_nous_2 from "../../img/qui_sommes_nous_2.png";

export const QuiSommesNous = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1>Qui sommes-nous ?</h1>

        <section className={styles.section_partie_une}>
          <img className={styles.img} src={qui_sommes_nous} alt="Illustration de présentation" loading="lazy" />
          <article>
            <p>
              La démarche NIRD (Numérique Inclusif, Responsable et Durable) est portée 
              par un collectif d’enseignantes et d’enseignants engagés, issus de la forge 
              des communs numériques éducatifs. Nous sommes des acteurs de terrain, convaincus 
              que l’école doit jouer un rôle moteur dans la transition vers un numérique 
              plus sobre, éthique et accessible à toutes et tous.
            </p>

            <p>
              Face aux enjeux écologiques, sociaux et technologiques, nous proposons une 
              alternative crédible et pragmatique à la dépendance croissante aux solutions 
              propriétaires et énergivores. Notre initiative est indépendante, collaborative, 
              et ouverte à toutes les bonnes volontés : enseignants, personnels éducatifs, 
              directions, collectivités et partenaires engagés.
            </p>

            <p>
              Nous ne représentons aucune institution ni entreprise. Notre légitimité repose 
              sur l’expérience concrète menée dans nos établissements, notamment grâce au projet 
              pionnier du lycée Carnot de Bruay-la-Buissière, qui a démontré qu’une transition 
              numérique fondée sur le libre, le reconditionnement et la sobriété est non seulement 
              possible, mais bénéfique pour l’ensemble de la communauté éducative.
            </p>
          </article>
        </section>

        <section className={styles.section_partie_deux}>
          <article>
            <p>
              Notre mission est simple : accompagner les établissements scolaires français 
              dans une transition progressive vers un numérique plus inclusif, plus responsable 
              et véritablement durable.
            </p>

            <p>
              Nous croyons au pouvoir du collectif, du partage d’expériences et de la 
              co-construction. La démarche NIRD évolue grâce à ses participantes et participants, 
              via notre espace d’échange sur Tchap, où se construisent pas à pas les pratiques, 
              les outils et les retours du terrain.
            </p>

            <p>
              Rejoignez-nous pour transformer ensemble le numérique éducatif et ouvrir de 
              nouvelles perspectives pour les élèves comme pour les équipes pédagogiques.
            </p>
          </article>
          <img className={styles.img} src={qui_sommes_nous_2} alt="Illustration démarche NIRD" loading="lazy" />
        </section>
      </main>

      <Footer />
    </>
  );
};