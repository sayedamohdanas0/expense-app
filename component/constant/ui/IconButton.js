import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ name, size, color, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={style.buttonContainer}>
        <Ionicons name={name} size={size} color={color} /> 
      </View>
    </Pressable>
  );
}
export default IconButton;
const style = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    margin: 8,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});
