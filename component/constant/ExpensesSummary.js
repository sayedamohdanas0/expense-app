import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "./style";
function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expenses) => {
    return sum + expenses.amount;
  }, 0);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.period}> {periodName} </Text>
      <Text style={styles.summary}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummary;
const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // elevation: 5,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
  },
  summary: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
