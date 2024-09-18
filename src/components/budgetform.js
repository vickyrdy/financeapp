import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function BudgetForm({ expenses, setExpenses }) {
  const [budget, setBudget] = useState(1000);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Array.isArray(expenses)) {
      expenses = [];
    }
    expenses = expenses.map(expense => ({
      ...expense,
      amount: isNaN(Number(expense.amount)) ? 0 : Number(expense.amount)
    }));
  }, [expenses]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBudgetChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const handleSetBudget = () => {
    setShow(false);
  };

  const totalExpenses = Array.isArray(expenses)
    ? expenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;

  const remainingBudget = budget - totalExpenses;

  return (
    <div className="widget">
      <h3>Budget</h3>
      <p>Total Expenses: £{totalExpenses}</p>
      <p>Remaining Budget: £{remainingBudget}</p>
      <Button variant="primary" onClick={handleShow}>
        Set Budget
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="number" value={budget} onChange={handleBudgetChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSetBudget}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BudgetForm;
