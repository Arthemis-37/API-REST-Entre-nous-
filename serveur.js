require('dotenv').config();
require('./models/associations');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

async function startServer() {
    try {
        await require('./database').authenticate();
        console.log('Connexion à la base de données réussie.');
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Serveur démarré sur le port ${port}`);
        });
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
}

startServer();