const http = require('http');
const app = require('./app');
const {associate} = require('./model/associations.js');
const database = require('./config/database.js');

async function startServer() {
    try {
        const server = http.createServer(app);

        server.on("listening"), () => {
            console.log(`Server is listening on port 3001`);
        };
        await database.authenticate();
        await associate();
        console.log('Connexion à la base de données réussie.');
        server.listen(3001);
        console.log(`Serveur démarré sur le port 3001`);
     
    } catch (error) {
        console.error('Impossible de se connecter à la base de données');
    }
}

startServer();