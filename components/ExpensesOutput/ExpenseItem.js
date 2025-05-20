import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";


const ExpenseItem = ({ id,description, amount, date }) => {
const navigation = useNavigation(); 
  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)} >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        shadowColor: GlobalStyles.colors.primary700,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      descriptionText: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
      },
      amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
        minHeight: 35,
      },
        amountText: {
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,
        },
      textBase: {
        color: GlobalStyles.colors.primary50,
      },
});
