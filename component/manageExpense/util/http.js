import axios from "axios";
import { BackHandler } from "react-native";

const BACKEND_URL = "https://tracker-app-81bac-default-rtdb.firebaseio.com";

export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
}
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  console.log(response.data);
  for (const key in response.data) {
    if (response.data.hasOwnProperty(key)) {
      const expenseobj = {
        id: key,
        amount: response.data[key]?.amount,
        date: response.data[key]?.date,
        description: response.data[key]?.description,
      };
      expenses.push(expenseobj);
    }
  }
  return expenses;
}
