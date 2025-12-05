import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageAccueil } from "./composants/page_accueil/page_accueil.jsx";
import { QuiSommesNous } from "./composants/qui_sommes_nous/qui_sommes_nous.jsx";
import { DecouvrezUniversGeneral } from "./composants/decouvrez_univers/decouvrez_univers_general.jsx";
import { Questionnaire } from "./composants/questionnaire/questionnaire.jsx";
import { Connexion } from "./composants/inscription_connexion/Connexion";
import { ChoixInscription } from "./composants/inscription_connexion/ChoixInscription";
import { ParticulierInscription } from "./composants/inscription_connexion/ParticulierInscription";
import { OrganisationInscription } from "./composants/inscription_connexion/OrganisationInscription";
import { EntrepriseInscription } from "./composants/inscription_connexion/EntrepriseInscription";
import { Profil } from "./composants/profil/Profil.jsx";
import { ForumPage } from './composants/forum/ForumPage.jsx';
import { BullePage } from './composants/forum/BullePage.jsx';
import { MentionsLegales } from './composants/mentions_legales/MentionsLegales.jsx';
import { PolitiqueConfidentialite } from './composants/politique_confidentialite/PolitiqueConfidentialite.jsx';
import { Snake } from './composants/snake/snake.jsx';
import { ScrollToTop } from './tools/ScrollToTop.js';
import { InstructionsPage } from "./composants/questionnaire/InstructionsPage.jsx";

function App() {

  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        <Route path='/' element={<PageAccueil />}/>
        <Route path='/qui-sommes-nous' element={<QuiSommesNous />}/>
        <Route path='/decouvrez_univers_general' element={<DecouvrezUniversGeneral />}/>
        <Route path='/questionnaire' element={<Questionnaire />}/>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<ChoixInscription />} />
        <Route path="/inscription/particulier" element={<ParticulierInscription />} />
        <Route path="/inscription/organisation" element={<OrganisationInscription />} />
        <Route path="/inscription/entreprise" element={<EntrepriseInscription />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:threadId" element={<BullePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/instructions" element={<InstructionsPage />} />
      </Routes>
    </Router>
  )
}

export default App
