import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList' 
import { GlobalStyles } from '../../constants/style'
import React from 'react'

const ExpensesOutput = ({expenses,expensesPeriod ,fallbackText}) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View>
       <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
         {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText:{
    color: GlobalStyles.colors.primary200,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
})