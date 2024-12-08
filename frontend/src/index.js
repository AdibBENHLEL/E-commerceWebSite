// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Si vous avez des styles CSS personnalisés
import App from './App'; // C'est le composant principal de votre application
import reportWebVitals from './reportWebVitals'; // Optionnel, pour les métriques de performance

// Rendu de l'application dans l'élément DOM avec l'ID 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Pour mesurer la performance de l'application (optionnel)
reportWebVitals();
