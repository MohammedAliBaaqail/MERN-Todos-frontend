import React from 'react'
import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CompletedTodo from "./CompletedTodo";
export default function EditTitle({todo}) {

    const { dispatch } = useTodosContext();
    const { user } = useAuthContext();
    
    const [hiddenTitle, setHiddenTitle] = useState(true);
    const [title, setTitle] = useState(todo.title);
    
    const handleEdit = async (e) => {
        e.preventDefault();
    
        if (!user) {
          return;
        }
        const updetedTodo = { title };
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
        //   setHiddenTitle(!hiddenTitle)
        
    
        }
   
        document.getElementById(todo._id+todo.title).click()
        setHiddenTitle(true)
        
      };


    const handleToggoleTitle = () => {
        setHiddenTitle(!hiddenTitle);
      };


  return (
    <div>
                <div className="flex-input">
      <button className="toggle hide-class" onClick={handleToggoleTitle} >Edit</button>
      <div className={!hiddenTitle ? "hide" : ""} >
         <h3 className="highlight">Title: {todo.title}</h3>
        </div>
         <div className={hiddenTitle ? "hide" : ""} >
            <input
              defaultValue={todo.title}
              type="text"
              className="input updated-title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button id={todo._id+todo.title} className="btn" onClick={handleEdit}>
            Submit
            </button>
          </div>
        </div>
    </div>
  )
}
