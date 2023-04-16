import { TextInput, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../constant/style";

function Input({ label: label, textInputConfig, styles, isValid }) {
  const inputStyle = [style.input];
  if (textInputConfig && textInputConfig.multiline)
    inputStyle.push(style.inputMultiline);
  if (isValid) {
    inputStyle.push(style.invalidInput);
  }
  return (
    <View style={[style.inputContainer, styles]}>
      <Text style={[style.label, isValid && style.invalidLabel]}>{label} </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}
export default Input;
const style = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error500,
  },
});
