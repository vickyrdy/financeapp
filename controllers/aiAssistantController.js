const axios = require('axios');

// Function to handle finance-related queries
const askFinanceAI = async (req, res) => {
  const { query } = req.body;

  // Ensure the query is finance-related
  if (!query.toLowerCase().includes('finance') && !query.toLowerCase().includes('budget')) {
    return res.json({ answer: "Sorry, I can only help with finance-related questions." });
  }

  try {
    // API call to OpenAI
    const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
      max_tokens: 200,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const answer = aiResponse.data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the request.' });
  }
};

module.exports = { askFinanceAI };
