import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import CircleChart from './circlechart';
import ExpenseForm from './expenseform';
import ExpenseList from './expenselist';
import { fetchExpenses, addExpense } from '../utils/api';
import '../dashboard.css';

function Dashboard({ user }) {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const expensesData = await fetchExpenses(user);
                setExpenses(expensesData);
                calculateRemainingBudget(expensesData);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        loadExpenses();
    }, []);

    const calculateRemainingBudget = (expensesData) => {
        const totalSpent = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
        setRemainingBudget(budget - totalSpent);
    };

    const handleSetBudget = () => {
        setRemainingBudget(budget); // Set the remaining budget when setting the budget
    };

    const handleAddExpense = async (newExpense) => {
        try {
            await addExpense(newExpense);
            const updatedExpenses = [...expenses, newExpense];
            setExpenses(updatedExpenses);
            calculateRemainingBudget(updatedExpenses);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <h2>Expense Dashboard</h2>

                <div className="chart-section">
                    <CircleChart user={user} />
                </div>

                <div className="budget-section">
                    <h3>Set Your Budget</h3>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(parseFloat(e.target.value))}
                    />
                    <button onClick={handleSetBudget}>Set Budget</button>
                    <p>Remaining Budget: £{remainingBudget.toFixed(2)}</p>
                </div>

                <div className="expense-section">
                    <ExpenseForm setExpenses={setExpenses} handleAddExpense={handleAddExpense} user={user}/>
                    <ExpenseList expenses={expenses} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
