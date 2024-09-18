import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const ExpenseForm = ({ handleAddExpense, user }) => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(dayjs());

    const handleSubmit = (e) => {
        console.log(JSON.stringify(user));
        e.preventDefault();

        const newExpense = {
            user,
            description: expenseName,
            amount: parseFloat(amount),
            category,
            date: date.$d || new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        handleAddExpense(newExpense);
        setExpenseName('');
        setAmount(0);
        setCategory('');
        setDate(dayjs());
    };

    return (

        <div >
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <h3>Add Expense</h3>
                <TextField size="small" label="Amount" variant="outlined" onChange={(e) => setAmount(e.target.value)} value={amount} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        value={date} onChange={(newValue) => { console.log(newValue.$d); setDate(newValue) }}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </LocalizationProvider>
                <TextField size="small" label="Description" variant="outlined" onChange={(e) => setExpenseName(e.target.value)} value={expenseName} />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        label="Category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    > <MenuItem value={"food"}>Food</MenuItem>
                        <MenuItem value={"fuel"}>Fuel</MenuItem>
                        <MenuItem value={"rent"}>Rent</MenuItem>
                        <MenuItem value={"lent"}>Lent nandha</MenuItem>
                        <MenuItem value={"borrowed"}>Borrowed</MenuItem>
                        <MenuItem value={"misc"}>Misc</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" size="medium"color="primary" onClick={handleSubmit}>Add</Button>
            </Box>
        </div>
    );
};

export default ExpenseForm;
