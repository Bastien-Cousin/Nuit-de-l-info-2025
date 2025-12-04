import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageAccueil } from "./composants/page_accueil/page_accueil.jsx";
import { Index } from "./composants/index/Index.jsx";
import { Connexion } from "./composants/inscription_connexion/Connexion";
import { ChoixInscription } from "./composants/inscription_connexion/ChoixInscription";
import { ParticulierInscription } from "./composants/inscription_connexion/ParticulierInscription";
import { OrganisationInscription } from "./composants/inscription_connexion/OrganisationInscription";
import { EntrepriseInscription } from "./composants/inscription_connexion/EntrepriseInscription";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageAccueil />}/>
        <Route path='/' element={<Index />}/>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<ChoixInscription />} />
        <Route path="/inscription/particulier" element={<ParticulierInscription />} />
        <Route path="/inscription/organisation" element={<OrganisationInscription />} />
        <Route path="/inscription/entreprise" element={<EntrepriseInscription />} />
      </Routes>
    </Router>
  )
}

export default App
