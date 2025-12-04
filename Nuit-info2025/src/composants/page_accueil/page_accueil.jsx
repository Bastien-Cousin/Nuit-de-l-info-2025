import React from 'react'
import { Header } from '../header/Header.jsx';
import { Footer } from '../footer/Footer.jsx';
import styles from './page_accueil.module.css';
import nird_logo from "../../img/nird_logo.png";

export const PageAccueil = () => {

  return (
    <div>
      <Header/>
      <div className={styles['landing-page-container']}>
        <div className={styles['presentation-container']}>
          <img src={ nird_logo } alt="Logo NIRD"/>
          <div className={styles['presentation-text']}>
            <h1>SLOGAN STYLE BAKA UWU</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu hendrerit elit. Nullam vel magna est. Nulla fermentum, magna in tincidunt vulputate, nisi magna vehicula orci, non dapibus ex metus eget quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis non dui eleifend, auctor arcu id, bibendum nunc. Integer aliquet porttitor velit. Curabitur eros nisl, molestie sed ultrices sit amet, dignissim non libero. Fusce finibus nulla eget varius egestas.</p>
            <button>Nous découvrir</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}