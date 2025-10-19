export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query || {};
      if (!userId) return res.status(400).json({ error: 'User ID is required' });

      const messages = [
        { id: 1, text: 'Hello! How are you?', sender: 'bot', timestamp: new Date().toISOString() },
        { id: 2, text: "I'm good, thanks!", sender: 'user', timestamp: new Date().toISOString() }
      ];

      return res.status(200).json({ messages });
    }

    if (req.method === 'POST') {
      const { message, userId } = req.body || {};
      if (!message || !userId) return res.status(400).json({ error: 'Message and user ID are required' });

      const response = {
        id: Date.now(),
        text: 'I understand. Let me help you with that.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      return res.status(200).json(response);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('chat API error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
