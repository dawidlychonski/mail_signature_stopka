// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignatureForm from './Components/SignatureForm';
import FooterPreview from './Components/FooterPreview';
import { SignatureProvider } from './context/SignatureContext';

function App() {
  return (
    <SignatureProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignatureForm />} />
          <Route path="/signature" element={<FooterPreview />} />
        </Routes>
      </Router>
    </SignatureProvider>
  );
}

export default App;
