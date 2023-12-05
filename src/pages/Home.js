import { useEffect, useState  } from "react"
import {useTodosContext} from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"

import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"

// components


const Home = () => {
    const { todos, dispatch } = useTodosContext()
    const {user} = useAuthContext()

  
    const [filterdTodos, setFilterdTodos] = useState(useTodosContext().todos)

        useEffect(() => {
          setFilterdTodos(todos)
        }, [todos])


    const hanndleSearch = (e) => {
        const search = e.target.value
        const filterdTodos = todos.filter(todo => {
            return todo.title.toLowerCase().includes(search.toLowerCase())
             || todo.date.toLowerCase().includes(search.toLowerCase())
             || todo.duration.toLowerCase().includes(search.toLowerCase()) 
        })
        setFilterdTodos(filterdTodos)
    }
    useEffect(() => {
      const fetchTodos = async () => {
        const response = await fetch('/api/todos', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_TODOS', payload: json})
        }
      }
  
      if (user) {
        fetchTodos()
      }
    }, [dispatch, user ])

 
  return (
    <div className="home">
        <TodoForm todos={todos} hanndleSearch={hanndleSearch}/>

        <div className="todos-container">


            {filterdTodos ? filterdTodos.map(todo => (
                <TodoDetails todo={todo} key={todo._id} />
               )): <h1 className="loading">Loading</h1>}
           { filterdTodos ? filterdTodos.length === 0 &&<h1 className="loading">No Todos Found!</h1>: <></>}
            
        </div>
        
    </div>
  )
}

export default Home