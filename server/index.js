const http = require('http');
const { setupSocketIO } = require('./socket-server');

const server = http.createServer();
setupSocketIO(server);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur de chat démarré sur le port ${PORT}`);
});