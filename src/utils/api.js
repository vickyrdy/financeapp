import axios from 'axios';

const WIT_API_URL = 'https://api.wit.ai/message';
const WIT_API_TOKEN = 'SPXMZ6FXFNZR7OV27I7XGL6IKB7NZCYB';
const API_URL = 'http://localhost:5000/api';

// Fetch Expenses for a user
export const fetchExpenses = async (user) => {
  const token = localStorage.getItem('token');
  if (!user || !user._id) {
    console.error('User is not defined or does not have an ID');
    return [];
  }
  console.log('Fetching expenses for user ID:', user._id);

  try {
    const response = await axios.get(`${API_URL}/expenses/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

// Provide Expense Suggestions
export const getExpenseSuggestions = async (user) => {
  const expenses = await fetchExpenses(user);

  const suggestions = [];
  if (expenses.length > 0) {
    expenses.forEach((expense) => {
      if (expense.amount > 100) {
        suggestions.push(`You could reduce spending on ${expense.category}.`);
      }
    });
  } else {
    suggestions.push('No expenses found.');
  }
  return suggestions;
};

// Provide Budget Advice based on total expenses
export const getBudgetAdvice = async (user) => {
  const expenses = await fetchExpenses(user);
  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += expense.amount;
  });

  const advice = totalExpenses > 1000
    ? 'Your expenses are high. Try cutting down on non-essential purchases.'
    : 'Your budget looks balanced. Keep up the good work!';

  return advice;
};

// Add an Expense
export const addExpense = async (expense) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/expenses`, expense, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch User Profile
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Register a New User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Verify Two-Factor Authentication
export const verify2FA = async ({ email, verificationCode }) => {
  const response = await axios.post(`${API_URL}/auth/verify-2fa`, { email, verificationCode });
  return response.data;
};

// Fetch AI Response from the custom API
export const fetchAIResponse = async (query) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/ai/ask`,
    { query },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Fetch GPT-3 Response
export const fetchGpt3Response = async (prompt) => {
  try {
    const response = await axios.post('/api/ai/gpt3', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error fetching GPT-3 response:', error);
    throw error;
  }
};
