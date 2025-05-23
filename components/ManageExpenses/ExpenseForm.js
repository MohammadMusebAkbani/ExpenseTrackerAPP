import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constants/style";
import Buttons from "../UI/Buttons";

const ExpenseForm = ({ isEditing, onCancleProps, onSubmit , defaultValues }) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true
    },
    date: {
      value: defaultValues
        ? defaultValues.date.toISOString().slice(0, 10)
        : "",
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true
    }
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInput((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]:{value:enteredValue , isValid: true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
     
    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid
    ) {
      // If any of the values are invalid, return early and do not submit the form.
      setInput((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !input.amount.isValid ||
    !input.date.isValid ||
    !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            placeholder: "0.00",
            value: input.amount.value,
            onChangeText: inputChangedHandler.bind(this, "amount"),
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: input.date.value,
            onChangeText: inputChangedHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          placeholder: "Expense description",
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "words",
          value: input.description.value,
          onChangeText: inputChangedHandler.bind(this, "description"),
        }}
      />
      {
        formIsInvalid && (
          <Text style={{ color: GlobalStyles.colors.error500 }}>
            Invalid Input Values - Please Check Your Entered Data!
          </Text>
        )
      }
      <View style={styles.buttonView}>
        <Buttons style={styles.button} mode="flat" OnPressProps={onCancleProps}>
          Cancle
        </Buttons>
        <Buttons style={styles.button} OnPressProps={ submitHandler}>
          {isEditing}
        </Buttons>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
    marginVertical: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
