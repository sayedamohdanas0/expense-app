import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {
    {
      description, date, amount;
    }
  },
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
});
function expenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "Delete":
      return state.filter((expense) => expense.id !== action.payload.id);
    case "Update":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];

      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpense = [...state];
      updatedExpense[updatableExpenseIndex] = updatedItem;
      return updatedExpense;

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "Delete", payload: { id } });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "Update", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
