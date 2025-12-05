import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';
import styles from './PolitiqueConfidentialite.module.css';

export const PolitiqueConfidentialite = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1>Politique de Confidentialité</h1>

        <section className={styles.section}>
          <h2>Collecte des données</h2>
          <p>
            Nous collectons uniquement les informations nécessaires à l’utilisation de nos services,
            comme votre nom, email, ou données liées à votre compte utilisateur. Aucune information 
            sensible n’est demandée sans votre consentement explicite.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Utilisation des données</h2>
          <p>
            Les données collectées sont utilisées pour améliorer votre expérience sur le site, 
            répondre à vos demandes, et gérer votre compte utilisateur. Nous ne vendons ni ne partageons 
            vos données personnelles avec des tiers à des fins commerciales.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>
            Le site utilise des cookies techniques nécessaires au bon fonctionnement des services. 
            Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités 
            pourraient être limitées.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Droits des utilisateurs</h2>
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression 
            de vos données personnelles. Pour exercer vos droits, veuillez nous contacter à l’adresse 
            email : pierredeldallepro@gmail.com.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données 
            contre tout accès non autorisé, altération ou divulgation.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Modifications de la politique</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour ponctuellement. Les utilisateurs 
            seront informés des modifications importantes via le site ou par email.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};
