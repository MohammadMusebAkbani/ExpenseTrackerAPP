import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/style";
import IconButtons from "../components/UI/IconButtons";
import Buttons from "../components/UI/Buttons";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  // !! is a double Exclamation operator that converts a value to a boolean.
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancleHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    // expenseData is an object that contains the data entered in the form.
    // It is passed as an argument to the confirmHandler function when the user submits the form.
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* // ExpenseForm is a custom component that handles the input fields for the expense form.
        // It is imported from the components/ManageExpenses/ExpenseForm.js file. */}
      <ExpenseForm 
      isEditing={isEditing ? 'Update' : 'Add'} 
      onCancelProps={cancleHandler}
      onSubmit={confirmHandler}
       defaultValues={selectedExpense} />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButtons
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPressProps={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
