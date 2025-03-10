
export interface Expense {
    id: number;
    date: string;
    amount: number;
    merchant: string;
    category: string;
}

const API_URL = "https://tip-transactions.vercel.app/api/transactions";

// Fetch expenses from the API
export const fetchExpenses = async (): Promise<Expense[]> => {
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error("Failed to get expenses");
      }
  
      const data = await response.json(); // Parse the JSON response
  
      return data.transactions; // Extract the "transactions" array
    } catch (error) {
      console.error(error);
      return []; // Return an empty array if there's an error
    }
  };