import axios from "axios";
import { BackHandler } from "react-native";

const BACKEND_URL = "https://tracker-app-81bac-default-rtdb.firebaseio.com";

 export async function storeExpense(expenseData) {
  const response= await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id= response.data.name
  return id
}
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  console.log(response.data);
  for (const key in response.data) {
    console.log({key})
    if (response.data.hasOwnProperty(key)) {
      const expenseobj = {
        id: key,
        amount: response.data[key]?.amount,
        date: new Date(response.data[key]?.date),
        description: response.data[key]?.description,
      };
      expenses.push(expenseobj);
    }
  }
  return expenses;
}
export   function updateExpense(id,expenseData){
  console.log("hi from updatee")
  return axios.put(BACKEND_URL+`/expenses${id}.json`,expenseData) 
}
export  function deleteExpense(id){
  return axios.delete(BACKEND_URL+`/expenses${id}.json`)
}
