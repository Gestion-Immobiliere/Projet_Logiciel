import Message from "../models/Message.js";

export default function socket(io) {
    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('joinRoom', ({ sender, receiver }) => {
            const roomId = [sender, receiver].sort().join('_');
            socket.join(roomId);
            console.log(`user joined room ${roomId}`);
        })
        // Réception d'un message
        socket.on('sendMessage', async ({ sender, receiver, content, bien }) => {
            const roomId = [sender, receiver].sort().join('_');

            // Sauvegarder dans MongoDB
            const message = new Message({
                sender,
                receiver,
                content,
                room: roomId,
                bien: bien
            })
            await message.save();

            io.to(roomId).emit('receiveMessage', {
                sender,
                content,
                createdAt: message.createdAt,
            })

        })
    })
}