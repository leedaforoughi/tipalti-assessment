import React, { useEffect, useState } from "react";
import { fetchExpenses, Expense } from "../services/api";
import "./ExpenseTable.css";

// 🕑 Format the date as "08:03 - 16/10/2024"
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${time} - ${day}/${month}/${year}`;
};

// 🔠 Capitalize the first letter of the category
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const ExpenseTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data.slice(0, 20)); // ✅ Show first 20 entries
      } catch (err) {
        setError("Failed to load expenses.");
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="expense-container">
      <h2 className="title">Expenses</h2> {/* ✅ Centered title */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th> {/* ✅ Changed to £ */}
            <th>Merchant</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{formatDate(expense.date)}</td>
              <td>£{expense.amount.toFixed(2)}</td> {/* ✅ Changed to £ */}
              <td>{expense.merchant}</td>
              <td>{capitalizeFirstLetter(expense.category)}</td> {/* ✅ Capitalized category */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
