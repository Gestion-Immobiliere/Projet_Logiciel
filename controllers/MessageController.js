async (req, res) => {
    const { userId1, userId2 } = req.params;
    const roomId = [userId1, userId2].sort().join('_');

    try {
        const messages = await Message.find({ room: roomId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}