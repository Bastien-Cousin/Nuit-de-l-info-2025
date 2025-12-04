import React from 'react'
import { Header } from '../header/Header.jsx'
import styles from './page_accueil.module.css'
import nird_logo from "../../img/nird_logo.png";

export const PageAccueil = () => {

  return (
    <div>
      <Header/>
      <div className={styles['landing-page-container']}>
        <div className={styles['presentation-container']}>
          <img src={ nird_logo } alt="Logo NIRD"/>
          <div className={styles['presentation-text']}>
            <h1>QUI SOMMES NOUS ?</h1>
            <p>Blablablablabla</p>
          </div>
        </div>
      </div>
    </div>
  )
}