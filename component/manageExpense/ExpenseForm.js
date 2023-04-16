import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./input";
import { GlobalStyles } from "../constant/style";
import { useState } from "react";
import Buttons from "../constant/ui/Buttons";
import { ProgressViewIOSComponent } from "react-native";

function ExpenseForm({
  onCancel: onCancel,
  submitButtonLabel: submitButtonLabel,
  onsubmit,
  defaultValue,
}) {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((currentValue) => {
      return {
        ...currentValue,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };
    const amountIsValid = isNaN | expenseData.amount && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsVAlid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsVAlid) {
      // Alert.alert('invalid input Please check your input')
      setInputValue((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: amountIsValid },
          date: { value: currInput.date.value, isValid: dateIsValid },
          description: {
            value: currInput.description.value,
            isValid: descriptionIsVAlid,
          },
        };
      });
      return;
    }

    onsubmit(expenseData);
  }
  const formIsInValid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={style.form}>
      <Text style={style.title}>Your Expense</Text>
      <View style={style.inputRow}>
        <Input
          styles={style.rowInput}
          label="Amount"
          isValid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          styles={style.rowInput}
          label="Date"
          isValid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        isValid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description.value,
        }}
      />
      {formIsInValid && (
        <Text style={style.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={style.buttons}>
        <Buttons style={style.button} mode="flat" onPress={onCancel}>
          cancel
        </Buttons>
        <Buttons onPress={submitHandler}>{submitButtonLabel}</Buttons>
      </View>
    </View>
  );
}
export default ExpenseForm;
const style = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
