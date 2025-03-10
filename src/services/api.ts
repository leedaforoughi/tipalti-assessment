export interface Expense {
    id: number;
    date: string;
    amount: number;
    merchant: string;
    category: string;
}

const API_URL = "https://tip-transactions.vercel.app/api/transactions";

// Fetch Expenses from API_URL
export const fetchExpenses = async (): Promise<Expense[]> => {
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error("Failed to get expenses");
      }
  
      const data = await response.json(); 
  
      return data.transactions; 
    } catch (error) {
      console.error(error);
      return []; 
    }
  };