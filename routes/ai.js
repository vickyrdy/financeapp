const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/gpt3', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return res.json({ response: message });
  } catch (error) {
    console.error('Error fetching GPT-3 response:', error);
    return res.status(500).json({ message: 'Failed to get GPT-3 response' });
  }
});

module.exports = router;
