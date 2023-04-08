import { Text, Pressable, View, StyleSheet } from "react-native";
import { GlobalStyles } from "./constant/style";
import getFormattedDate from "./Date";
import { useNavigation } from "@react-navigation/native";
function ExpensesItem({ description, amount, date }) {
  console.log(
    "-------------------------------------------------------- from item----------------",
    date
  );
  const navigation = useNavigation();
  function expenseHandler() {
    navigation.navigate("ManageExpenses");
  }
  return (
    <Pressable
      onPress={expenseHandler}
      style={({ pressed }) => pressed & style}
    >
      <View style={style.expenseItem}>
        <View>
          <Text style={[style.textBase, style.description]}>{description}</Text>
          <Text style={style.textBase}>
            {date ? getFormattedDate(date) : ""}
          </Text>
        </View>
        <View style={style.priceContainer}>
          <Text style={style.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpensesItem;
const style = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 24,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
