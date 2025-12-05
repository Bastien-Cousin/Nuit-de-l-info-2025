import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageAccueil } from "./composants/page_accueil/page_accueil.jsx";
import { QuiSommesNous } from "./composants/qui_sommes_nous/qui_sommes_nous.jsx";
import { DecouvrezUniversPage1 } from "./composants/decouvrez_univers_page1/decouvrez_univers_page1.jsx";
import { Questionnaire } from "./composants/questionnaire/questionnaire.jsx";
import { Connexion } from "./composants/inscription_connexion/Connexion";
import { ChoixInscription } from "./composants/inscription_connexion/ChoixInscription";
import { ParticulierInscription } from "./composants/inscription_connexion/ParticulierInscription";
import { OrganisationInscription } from "./composants/inscription_connexion/OrganisationInscription";
import { EntrepriseInscription } from "./composants/inscription_connexion/EntrepriseInscription";
import { Profil } from "./composants/profil/Profil";
import { Forum } from "./composants/forum/Forum";
import { Catégorie } from "./composants/forum/Catégorie";
import { Bulle } from "./composants/forum/Bulle";
import { MentionsLegales } from './composants/mentions_legales/MentionsLegales.jsx';
import { PolitiqueConfidentialite } from './composants/politique_confidentialite/PolitiqueConfidentialite.jsx';
import { Snake } from './composants/snake/snake.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageAccueil />}/>
        <Route path='/qui-sommes-nous' element={<QuiSommesNous />}/>
        <Route path='/decouvrez_univers_page1' element={<DecouvrezUniversPage1 />}/>
        <Route path='/questionnaire' element={<Questionnaire />}/>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<ChoixInscription />} />
        <Route path="/inscription/particulier" element={<ParticulierInscription />} />
        <Route path="/inscription/organisation" element={<OrganisationInscription />} />
        <Route path="/inscription/entreprise" element={<EntrepriseInscription />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:categoryId" element={<Catégorie />} />
        <Route path="/thread/:threadId" element={<Bulle />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/snake" element={<Snake />} />
      </Routes>
    </Router>
  )
}

export default App
