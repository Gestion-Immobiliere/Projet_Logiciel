import { Server } from 'socket.io';

export function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  const users = new Set();

  io.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    socket.on('register', (username, callback) => {
      console.log('Tentative d\'enregistrement:', username);

      if (typeof username !== 'string' || username.trim().length < 3) {
        if (typeof callback === 'function') {
          return callback({
            success: false,
            message: 'Le pseudo doit contenir au moins 3 caractères',
          });
        }
        return;
      }

      if (users.has(username)) {
        console.log('Pseudo déjà utilisé:', username);
        if (typeof callback === 'function') {
          return callback({
            success: false,
            message: 'Ce pseudo est déjà utilisé',
          });
        }
        return;
      }

      users.add(username);
      socket.username = username;
      console.log('Utilisateur enregistré:', username, 'Liste des utilisateurs:', Array.from(users));

      if (typeof callback === 'function') {
        callback({ success: true, message: 'Bienvenue dans le chat !' });
      }
    });

    socket.on('chatMessage', (message) => {
      if (!socket.username) return;
      
      io.emit('chatMessage', {
        username: socket.username,
        content: message,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      if (socket.username) {
        users.delete(socket.username);
        console.log('Utilisateur supprimé:', socket.username, 'Liste des utilisateurs:', Array.from(users));
        io.emit('systemMessage', {
          content: `${socket.username} a quitté le chat`,
          timestamp: new Date().toISOString()
        });
      }
      console.log('Déconnexion:', socket.id);
    });
  });

  return io;
}