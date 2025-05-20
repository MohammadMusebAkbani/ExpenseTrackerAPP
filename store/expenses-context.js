import { createContext , useReducer} from "react";


const Dummy_expenses = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2023-01-12"),
    },
    {
        id: "e2",
        description: "A pair of pants",
        amount: 39.99,
        date: new Date("2023-01-13"),
    },
    {
        id: "e3",
        description: "A pair of socks",
        amount: 19.99,
        date: new Date("2023-01-14"),
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    updateExpense: (id, { description, amount, date }) => {},
    deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{
                ...action.payload,id: id},...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload.id);
        default:
            return state;
    }
}

 function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer,Dummy_expenses);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    }
    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: { id: id } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };

    // The value prop of the Provider component is the value that will be passed to the context consumers.
    // In this case, the value prop is an object that contains the expenses state and the functions to add, update, and delete expenses.
    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}
export default ExpensesContextProvider;