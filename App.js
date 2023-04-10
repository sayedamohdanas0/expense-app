import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "./Screen/ManageExpenses";
import RecentExpenses from "./Screen/RecentExpenses";
import AllExpenses from "./Screen/AllExpenses";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./component/constant/style";
import IconButton from "./component/constant/ui/IconButton";
import ExpensesContextProvider from "./Screen/store/expensesContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Bottom = createBottomTabNavigator();
  function ExpensesOverView() {
    return (
      <Bottom.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: () => {
            return (
              <IconButton
                name="add"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate("ManageExpenses");
                }}
              />
            );
          },
        })}
      >
        <Bottom.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="hourglass" size={size} color={color} />;
            },
          }}
        />
        <Bottom.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "AllExpenses Expenses",
            tabBarLabel: "AllExpenses",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="calendar" size={size} color={color} />;
            },
          }}
        />
      </Bottom.Navigator>
    );
  }
  return (
    <ExpensesContextProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ExpensesOverView"
          component={ExpensesOverView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
});
