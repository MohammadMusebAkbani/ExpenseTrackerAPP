import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

const Buttons = ({ children, OnPressProps, mode , style}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={OnPressProps}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttontext, mode === "flat" && styles.flattext]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttontext: {
    color: "white",
    textAlign: "center",
  },
  flattext: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
