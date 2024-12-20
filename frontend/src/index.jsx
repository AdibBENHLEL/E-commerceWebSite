import React from 'react';
import ReactDOM from 'react-dom/client'; // Import only once
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Optional
import './index.css';
// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: For measuring performance
reportWebVitals();
