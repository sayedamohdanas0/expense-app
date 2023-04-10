import { useContext } from "react";
import ExpensesOutput from "../component/constant/ExpensesOutput";
import { ExpensesContext } from "./store/expensesContext";

function AllExpenses() {
   const expeensesCtx=useContext(ExpensesContext)
  return <ExpensesOutput expenses={expeensesCtx.expenses} expensesPeriod="Total" fallBack="No registered expences found" />;
}
export default AllExpenses;
