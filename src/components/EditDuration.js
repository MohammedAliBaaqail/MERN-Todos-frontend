import React from 'react'
import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CompletedTodo from "./CompletedTodo";
export default function EditDuration({todo}) {

    const { dispatch } = useTodosContext();
    const { user } = useAuthContext();
    
    const [hiddenDuration, setHiddenDuration] = useState(true);
    const [duration, setDuration] = useState(todo.duration);
    
    const handleEdit = async (e) => {
        e.preventDefault();
    
        if (!user) {
          return;
        }
        const updetedTodo = { duration };
        const response = await fetch("/api/todos/" + todo._id, {
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
        //   setHiddenDuration(!hiddenDuration)
        
    
        }

        document.getElementById(todo._id+todo.duration).click()
        setHiddenDuration(true)
      };


    const handleToggoleDuration = () => {
        setHiddenDuration(!hiddenDuration);
      };


  return (
    <div>
                <div className="flex-input">
                <button className="toggle hide-class" onClick={handleToggoleDuration} >Edit</button>
      <div className={!hiddenDuration ? "hide" : ""} >
         <h3 className="highlight">Duration: {todo.duration}</h3>
        </div>
         <div className={hiddenDuration ? "hide" : ""} >
            <input
              defaultValue={todo.duration}
              type="text"
              className="input updated-duration"
              onChange={(e) => setDuration(e.target.value)}
            />
            <button id={todo._id+todo.duration} className="btn" onClick={handleEdit}>
            Submit
            </button>
          </div>
        </div>
    </div>
  )
}
