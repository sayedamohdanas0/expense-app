import { View, StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "./style";
const DUMMY_EXPENSES = [
  {
    id: "c1",
    description: "A pair of Shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "c2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2021-12-19"),
  },
  {
    id: "c3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "c4",
    description: "A book",
    amount: 14.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "c5",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2021-12-18"),
  },
];
function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={Style.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
export default ExpensesOutput;
const Style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
