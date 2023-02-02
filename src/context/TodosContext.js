import { createContext ,useReducer } from "react";

export const TodosContext = createContext();

export const todoReducer = (state, action) => {
    const { type, payload } = action;
    const { todos } = state;

    // const types = {
    //     SET_TODOS:"SET_TODOS",
    //     ADD_TODO:"ADD_TODO",
    //     UPDATE_TODO:"UPDATE_TODO",
    //     DELETE_TODO:"DELETE_TODO",
    // }
    //  const {SET_TODOS , ADD_TODO , UPDATE_TODO , DELETE_TODO} = types;


    switch (type) {
        case "SET_TODOS":
            return {
                todos: payload
            }
        case "ADD_TODO":
            return {
                todos: [ payload ,...todos]
            }
        case "UPDATE_TODO":
            return {
                todos: todos.map(todo => todo._id === payload._id ? payload : todo)
            }
        case "DELETE_TODO":
            return {
                todos: todos.filter(todo => todo._id !== payload._id)
            }
        default:
            return state
    }
}



export const TodoContextProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(todoReducer, {
        todos: null
    })
     
  return (
    <TodosContext.Provider value={{...state , dispatch}}>
      {children}
    </TodosContext.Provider>
  );
}