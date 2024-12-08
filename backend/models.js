const mysql = require('mysql2');

// Créez une connexion à la base de données
const connection = mysql.createConnection({
  host: 'database',       // Assurez-vous que le nom du service est correct dans Docker
  user: 'root',           // Votre nom d'utilisateur MySQL
  password: 'tpdocker',   // Votre mot de passe MySQL
  database: 'ecommerce'   // Le nom de la base de données
});

// Vérifiez la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

module.exports = connection;
