import { getDateMinusDays } from "../component/Date";
import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../component/constant/ExpensesOutput";
import { ExpensesContext } from "./store/expensesContext";
import { fetchExpenses } from "../component/manageExpense/util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [data,setData]=useState([])
  useEffect(() => {
    async function getExpenses(){
   const expenses= await fetchExpenses();
   expensesCtx.setExpenses(expenses)
   
    }
    getExpenses()
    

  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date < today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBack="No Expense Registeer for the last 7 days"
    />
  );
}
export default RecentExpenses;
