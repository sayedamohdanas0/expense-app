import { View, StyleSheet,Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "./style";
import { useSyncExternalStore } from "react";

function ExpensesOutput({ expenses, expensesPeriod ,fallBack}) {
  let content =<Text style={Style.infoText}>{fallBack} </Text>
  if(expenses.length>0){
     content= <ExpensesList expenses={expenses} />
  }
  return (
    <View style={Style.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    {content}
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
  infoText:{
    color:'white',
    fontSize:16,
  textAlign:'center',
  marginTop:32,
  }
});
