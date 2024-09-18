import React, { useState } from 'react';
import axios from 'axios';

const AiAssistantPage = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim()) return; // Prevent empty queries

    setLoading(true);
    try {
      const result = await axios.post('/api/ai/gpt3', { prompt: input });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error getting GPT-3 response:', error);
      setResponse('Error: Could not get a response from the AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-container" style={{ padding: '20px' }}>
      <h2>Chat with GPT-3</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{ width: '70%', padding: '10px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Send
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {response && (
        <div className="response-box" style={{ marginTop: '20px', backgroundColor: '#f1f1f1', padding: '10px' }}>
          <h4>AI Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiAssistantPage;
