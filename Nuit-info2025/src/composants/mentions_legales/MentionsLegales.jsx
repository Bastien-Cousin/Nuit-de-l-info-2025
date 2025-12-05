import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';
import styles from './MentionsLegales.module.css';

export const MentionsLegales = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1>Mentions Légales</h1>

        <section className={styles.section}>
          <h2>Éditeur du site</h2>
          <p>
            Ce site est édité par l'équipe French Baguettes Croissants durant la Nuit de l'Info 2025.
          </p>
          <p>
            Adresse : 50 rue Louis David, 62100 Calais, France<br />
            Email : pierredeldallepro@gmail.com
          </p>
        </section>

        <section className={styles.section}>
          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            Nom de l’hébergeur : Netlify<br />
          </p>
        </section>

        <section className={styles.section}>
          <h2>Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, vidéos, logos, designs) sont
            la propriété de French Baguettes Croissants ou de leurs auteurs respectifs. Toute reproduction, 
            même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Données personnelles</h2>
          <p>
            Conformément au RGPD, les informations collectées via ce site sont utilisées uniquement 
            pour les finalités déclarées et ne sont pas transmises à des tiers. Vous disposez 
            d’un droit d’accès, de modification et de suppression des données vous concernant.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Responsabilité</h2>
          <p>
            French Baguettes Croissants s’efforce de fournir des informations fiables et à jour, mais ne peut 
            être tenu responsable des erreurs ou omissions sur le site ou de l’usage fait des 
            informations publiées.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};