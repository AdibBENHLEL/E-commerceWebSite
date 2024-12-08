const express = require('express');
const cors = require('cors');
const connection = require('./models'); // Import de la connexion MySQL

const app = express();
app.use(cors());
app.use(express.json());

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);  // Renvoie les résultats en JSON
  });
});

// Route pour récupérer tous les produits
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);  // Renvoie les résultats en JSON
  });
});

// Route pour ajouter un utilisateur
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  // Vérification des données reçues
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Requête SQL pour insérer un nouvel utilisateur
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.status(201).json({
      id: results.insertId, // Retourne l'ID de l'utilisateur ajouté
      name,
      email,
    });
  });
});

// Route pour ajouter un produit
app.post('/products', (req, res) => {
  const { name, description, price, stock } = req.body;

  // Vérification des données reçues
  if (!name || !description || !price || !stock) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Requête SQL pour insérer un nouveau produit
  const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, description, price, stock], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du produit:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.status(201).json({
      id: results.insertId, // Retourne l'ID du produit ajouté
      name,
      description,
      price,
      stock,
    });
  });
});

// Démarrer le serveur sur le port 5000
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
