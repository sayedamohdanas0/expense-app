import { getDateMinusDays } from "../component/Date";
import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../component/constant/ExpensesOutput";
import { ExpensesContext } from "./store/expensesContext";
import { fetchExpenses } from "../component/manageExpense/util/http";
import LoadingOverlay from "../component/constant/LoadingOverlay";
import ErrorOverlay from "../component/constant/ErrorOverlay";

function RecentExpenses() {
     const [isFetching,setIsFetching]=useState(true);
     const [errors,setError]=useState()
  const expensesCtx = useContext(ExpensesContext);

  const [data,setData]=useState([])
  useEffect(() => {
    async function getExpenses(){
      setIsFetching(true)
      try {
        const expenses= await fetchExpenses();
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
  
   setIsFetching(false)

   
    }
    getExpenses()
    

  }, []);
  function erroehandler(){
    setError(null)
  }

  if(errors && !isFetching){
    return <ErrorOverlay message={errors} onConfirm={erroehandler}/>
  }

  if (isFetching){
    return <LoadingOverlay/>
  }

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
