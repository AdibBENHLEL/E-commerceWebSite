# Utiliser une image Node officielle
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de projet
COPY . .

# Exposer le port de développement de React
EXPOSE 3033

# Lancer l'application
CMD ["npm", "start"]
