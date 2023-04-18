import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import IconButton from "../component/constant/ui/IconButton";
import { GlobalStyles } from "../component/constant/style";
import Buttons from "../component/constant/ui/Buttons";
import { ExpensesContext } from "./store/expensesContext";
import ExpenseForm from "../component/manageExpense/ExpenseForm";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import {
  storeExpense,
  updateExpense,
  deleteExpense,
} from "../component/manageExpense/util/http";
import LoadingOverlay from "../component/constant/LoadingOverlay";

function ManageExpenses({ route, navigation }) {
  const [isSubmitting,setIsSubmitting]=useState(false)
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpnses = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  async function deleteHandler() {
    setIsSubmitting(true)
    await deleteExpense(editedExpenseId);
    
    expensesCtx.deleteExpense(editedExpenseId);

    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true) ///////puchna hai///
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
     
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      storeExpense({ ...expenseData, id });
      expensesCtx.addExpense(expenseData);
    }
    

    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  if(isSubmitting){
    return <LoadingOverlay/>
  }


  console.log(isEditing);

  return (
    <View style={style.container}>
      <ExpenseForm
        defaultValue={selectedExpnses}
        onsubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
      />

      {isEditing && (
        <View style={style.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
