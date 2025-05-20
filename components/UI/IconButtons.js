import { View, Text, Pressable,StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButtons = ({ icon, size, color, onPressProps }) => {
  return (
    <Pressable
      onPress={onPressProps}
      style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButtons;
const styles = StyleSheet.create({
    container:{
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2  ,
    },
});
