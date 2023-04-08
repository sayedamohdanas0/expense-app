import { FlatList, Text } from "react-native";
import ExpensesItem from "../ExpensesItem";
function renderExpenseItem(itemData) {
  console.log(
    { ...itemData.item },
    "-------------------------------------------------------------- from list-----------------"
  );
  return <ExpensesItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ExpensesList;
