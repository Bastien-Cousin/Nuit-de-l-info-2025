import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageAccueil } from "./composants/page_accueil/page_accueil.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageAccueil />}/>
      </Routes>
    </Router>
  )
}

export default App
