import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/style'
import React from 'react'

const ExpensesSummary = ({expenses,periodName}) => {
  const expensesSum = expenses.reduce((sum,expenses) => {
    return sum + expenses.amount
  }, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.periodTxt}>{periodName}</Text>
      <Text style={styles.amountTxt}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    backgroundColor:GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodTxt: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  amountTxt: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
  },
})