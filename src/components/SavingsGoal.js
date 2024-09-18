import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './savingsGoal.css';
import Celebration from './Celebration';
import { FaPlus } from 'react-icons/fa';

const SavingsGoal = ({ addNotification }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDate, setGoalDate] = useState('');
  const [amountSaved, setAmountSaved] = useState('');
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editedAmountSaved, setEditedAmountSaved] = useState({});

  const handleAddGoal = () => {
    if (!goalName || !goalAmount || !goalDate) {
      setErrorMessage('Please fill out all fields before adding a goal.');
      return;
    }

    setErrorMessage('');

    const newGoal = {
      goalName,
      goalAmount: parseFloat(goalAmount),
      goalDate,
      amountSaved: parseFloat(amountSaved),
      isCompleted: false,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals)); 
    addNotification('Goal created! Complete it to achieve a badge.');

    setGoalName('');
    setGoalAmount('');
    setGoalDate('');
    setAmountSaved('');
  };

  const handleEditAmountSaved = (index) => {
    // Work only with current goals, not completed ones
    const updatedGoals = [...goals];
    const currentGoal = currentGoals[index];

    // Get the new amount saved from the input
    const newSavedAmount = parseFloat(editedAmountSaved[index]) || 0;

    // Update the goal's saved amount
    currentGoal.amountSaved = newSavedAmount;

    // If the new saved amount equals or exceeds the goal amount, mark as completed
    if (newSavedAmount >= currentGoal.goalAmount) {
      currentGoal.isCompleted = true;
      addNotification('Goal completed! Enjoy your success!');
      setShowCelebration(true); // Ensure this is triggered when the goal is completed
    }

    // Replace the updated goal back into the overall goals array
    const updatedGoalsIndex = goals.findIndex(goal => goal.goalName === currentGoal.goalName);
    updatedGoals[updatedGoalsIndex] = currentGoal;

    // Save updated goals to state and localStorage
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = (index) => {
    const updatedGoals = goals.filter((goal, i) => i !== index);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    addNotification('Goal deleted.');
  };

  // Close the celebration popup when clicking anywhere
  useEffect(() => {
    const closeCelebration = () => setShowCelebration(false);
    if (showCelebration) {
      document.addEventListener('click', closeCelebration);
    }

    return () => {
      document.removeEventListener('click', closeCelebration);
    };
  }, [showCelebration]);

  const currentGoals = goals.filter(goal => !goal.isCompleted);
  const completedGoals = goals.filter(goal => goal.isCompleted);

  return (
    <div className="savings-goal-container">
      <h2 className="header-text">Savings Goals</h2>
      <Form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <FormGroup>
          <Label for="goalName">Goal Name</Label>
          <Input
            type="text"
            id="goalName"
            value={goalName !== null ? goalName : ''}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Enter your goal name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="goalAmount">Goal Amount (£)</Label>
          <Input
            type="number"
            id="goalAmount"
            value={goalAmount !== null ? goalAmount : ''}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="Enter goal amount"
          />
        </FormGroup>
        <FormGroup>
          <Label for="goalDate">Goal Date</Label>
          <Input
            type="date"
            id="goalDate"
            value={goalDate !== null ? goalDate : ''}
            onChange={(e) => setGoalDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="amountSaved">Amount Saved (£)</Label>
          <Input
            type="number"
            id="amountSaved"
            value={amountSaved !== null ? amountSaved : ''}
            onChange={(e) => setAmountSaved(e.target.value)}
            placeholder="Enter amount already saved"
          />
        </FormGroup>
        <Button color="primary" onClick={handleAddGoal}>
          <FaPlus /> Add Goal
        </Button>
      </Form>

      {currentGoals.length > 0 && (
        <div className="goal-list-section">
          <h3 className="subheader-text">Current Goals</h3>
          <div className="goal-list">
            {currentGoals.map((goal, index) => (
              <div key={index} className="goal-item">
                <h4>{goal.goalName}</h4>
                <p>
                  Goal Amount: £{goal.goalAmount} <br />
                  Amount Saved: £{goal.amountSaved}
                </p>
                <Input
                  type="number"
                  value={editedAmountSaved[index] || ''}
                  onChange={(e) => setEditedAmountSaved({ ...editedAmountSaved, [index]: e.target.value })}
                  placeholder="Update amount saved"
                />
                <Button
                  color="success"
                  onClick={() => handleEditAmountSaved(index)}
                >
                  Update Amount Saved
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDeleteGoal(index)}
                >
                  Delete Goal
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="goal-list-section">
          <h3 className="subheader-text">Completed Goals</h3>
          <div className="goal-list">
            {completedGoals.map((goal, index) => (
              <div key={index} className="goal-item">
                <h4>{goal.goalName}</h4>
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  Goal Achieved! <br />
                  Goal Amount: £{goal.goalAmount} <br />
                  Amount Saved: £{goal.amountSaved}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCelebration && <Celebration />} {/* Render the celebration component */}
    </div>
  );
};

export default SavingsGoal;
