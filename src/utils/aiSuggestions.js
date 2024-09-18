// A basic AI suggestion engine for personal finance
export const getAiSuggestion = (query) => {
    const lowerCaseQuery = query.toLowerCase();
  
    // Rule-based suggestions
    if (lowerCaseQuery.includes('budget')) {
      return 'It’s a good idea to track your spending and set a monthly budget. Try categorizing your expenses and make sure to save at least 20% of your income.';
    }
    if (lowerCaseQuery.includes('savings')) {
      return 'Savings are essential for financial health. Aim to set aside a portion of your income every month. Look into automating your savings for consistency.';
    }
    if (lowerCaseQuery.includes('invest')) {
      return 'Investing can help you grow your wealth over time. Consider low-risk, diversified investments like index funds. Don’t forget to research and consult a financial advisor.';
    }
    if (lowerCaseQuery.includes('debt')) {
      return 'Debt management is key. Focus on paying off high-interest debt first. Consider consolidating your debts for easier management and lower interest rates.';
    }
    if (lowerCaseQuery.includes('emergency fund')) {
      return 'Building an emergency fund should be a top priority. Aim for 3-6 months of living expenses saved in a liquid, easily accessible account.';
    }
  
    // Default response for unrecognized queries
    return 'I’m sorry, I couldn’t quite understand your query. Could you provide more details, or try asking about budgeting, savings, investments, or debt?';
  };
  