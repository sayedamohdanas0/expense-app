import { createContext, useReducer } from "react";
const DUMMY_EXPENSES = [
  {
    id: "c1",
    description: "A pair of Shoes",
    amount: 59.99,
    date: new Date("2023-04-03"),
  },
  {
    id: "c2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-04-04"),
  },
  {
    id: "c3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2023-04-15"),
  },
  {
    id: "c4",
    description: "A book",
    amount: 14.99,
    date: new Date("2023-04-17"),
  },
  {
    id: "c5",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-04-18"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {
    {
      description, date, amount;
    }
  },
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
});
function expenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "Delete", payload: { id } });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "Update", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
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
