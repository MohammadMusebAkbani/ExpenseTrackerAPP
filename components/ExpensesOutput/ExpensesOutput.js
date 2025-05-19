import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList' 
import React from 'react'

const ExpensesOutput = ({expenses,expensesPeriod}) => {
  return (
    <View>
       <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
         <ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({})