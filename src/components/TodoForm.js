import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { useAuthContext } from '../hooks/useAuthContext'


const TodoForm = ({todo ,hanndleSearch}) => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const todo = {title, date, duration}
    
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDate('')
      setDuration('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'ADD_TODO', payload: json})
        
    }

  }
  const errorMsg = emptyFields.map( (e) => <span> {e +' -'} </span>)
  
  return (
    <>
    <form className="todo-form" onSubmit={handleSubmit}> 
      <h3 className='highlight'>Add a New Todo</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Duration:</label>
      <input 
        type="text" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration}
        className={emptyFields.includes('duration') ? 'error' : ''} 
      />
      {/* <label>Completed:</label>
      <input 
        type="boolean" 
        onChange={(e) => setCompleted(e.target.value)} 
        value={completed} 
      /> */}

      <button>Add Todo</button>
      {error && <div className="error-msg">{error }:{errorMsg} </div>}
      <h3 className='highlight'>Search Todos</h3>
      <input className="search-todos" type="text" placeholder="Search" onChange={hanndleSearch}/>
    </form>
    
    </>
  )
}

export default TodoForm