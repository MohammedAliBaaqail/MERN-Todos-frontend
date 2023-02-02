import React from 'react'
import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CompletedTodo from "./CompletedTodo";
export default function EditDate({todo}) {

    const { dispatch } = useTodosContext();
    const { user } = useAuthContext();
    
    const [hiddenDate, setHiddenDate] = useState(true);
    const [date, setDate] = useState(todo.date);
    
    const handleEdit = async (e) => {
        e.preventDefault();
    
        if (!user) {
          return;
        }
        const updetedTodo = { date };
        const response = await fetch("https://mern-todos-backend.onrender.com/api/todos/" + todo._id, {
          method: "PATCH",
          body: JSON.stringify(updetedTodo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
    
        if (response.ok) {
          dispatch({ type: "UPDATE_TODO", payload: json });
        //   setHiddenDate(!hiddenDate)
        
    
        }
   
        document.getElementById(todo._id+todo.date).click()
        setHiddenDate(true)
      };


    const handleToggoleDate = () => {
        setHiddenDate(!hiddenDate);
      };


  return (
    <div>
                <div className="flex-input">
                <button className="toggle hide-class" onClick={handleToggoleDate} >Edit</button>
                <div className={!hiddenDate ? "hide" : ""} >
        <h3>Deadline: {todo.date}</h3>
        </div>
        <div className={hiddenDate ? "hide" : ""} >
          <input
          defaultValue={todo.date}
            type="date"
            className="input updated-deadline"
            onChange={(e) => setDate(e.target.value)}
          />
          <button id={todo._id+todo.date} className="btn" onClick={handleEdit}>
            Submit 
          </button>
        </div>
        </div>
    </div>
  )
}
