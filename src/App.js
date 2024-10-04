import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Salary", amount: 2000 },
    { id: 2, text: "Bills", amount: -1000 },
    { id: 3, text: "Rent", amount: -500 },
  ]);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null); 
  const [filter, setFilter] = useState("All");

  const calculateBalance = () => transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const calculateIncome = () => transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const calculateExpense = () => transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0) * -1;

  const addTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount.trim() === "") {
      return alert("Please provide both text and amount!");
    }

    if (editId) {
      setTransactions(transactions.map(transaction =>
        transaction.id === editId ? { ...transaction, text, amount: +amount } : transaction
      ));
      setEditId(null);
    } else {
      const newTransaction = {
        id: transactions.length + 1,
        text,
        amount: +amount,
      };
      setTransactions([...transactions, newTransaction]);
    }

    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const editTransaction = (transaction) => {
    setText(transaction.text);
    setAmount(transaction.amount.toString());
    setEditId(transaction.id); 
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "Income") {
      return transaction.amount > 0;
    } else if (filter === "Expense") {
      return transaction.amount < 0;
    } else {
      return true;
    }
  });

  
  return (
    <div className="container">
      <h2>Your Balance</h2>
      <h1>₱{calculateBalance().toFixed(2)}</h1>

      <div className="income-expense">
        <div>
          <h3>INCOME</h3>
          <p className="income-money">₱{calculateIncome().toFixed(2)}</p>
        </div>
        <div>
          <h3>EXPENSE</h3>
          <p className="expense-money">₱{calculateExpense().toFixed(2)}</p>
        </div>
      </div>

      <div className="position">
        <h3>History</h3>
        <br></br>
        <hr></hr>
        <br></br>

        <div className="filter-container">
          <label htmlFor="filter">Filter by: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <ul className="history">
        {filteredTransactions.map(transaction => (
          <li key={transaction.id} className={transaction.amount < 0 ? "minus" : "plus"}>
            <div className="details">
              {transaction.text}
              <span>
                {transaction.amount < 0 ? "-" : "+"}₱{Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
            <div className="button-container">
              <button onClick={() => editTransaction(transaction)} className="edit-btn">Edit</button>
              <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>


        <h3>{editId ? "Update Transaction" : "Add New Transaction"}</h3>
        <br></br>
        <hr></hr>
        <br></br>
        <form onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="text">Expense Category</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter category..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
          <button className="btn">{editId ? "Update" : "Add"} transaction</button>
        </form>
      </div>
    </div>
  );
}

export default App;
