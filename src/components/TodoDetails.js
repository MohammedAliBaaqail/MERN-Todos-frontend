import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CompletedTodo from "./CompletedTodo";
import EditTitle from "./EditTitle";
import EditDuration from "./EditDuration";
import EditDate from "./EditDate";

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState(todo.title);
  const [duration, setDuration] = useState(todo.duration);
  const [date, setDate] = useState(todo.date);

  const [hiddenTitle, setHiddenTitle] = useState(true);
  const [hiddenDate, setHiddenDate] = useState(true);
  const [hiddenDuration, setHiddenDuration] = useState(true);

  const updetedTodo = { title, duration, date };

  const handleToggoleTitle = () => {
    setHiddenTitle(!hiddenTitle);
  };
  const handleToggoleDate = () => {
    setHiddenDate(!hiddenDate);
  };
  const handleToggoleDuration = () => {
    setHiddenDuration(!hiddenDuration);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

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
      // setHidden(!hidden)
     

    }
  };

  const handleClick = async () => {

    if (!user) {
      return;
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    document.getElementById(todo._id).classList.add("animate__bounceOut");

    await sleep(500);

    const response = await fetch("/api/todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
      
    }
  };

  return (
    <div
      id={todo._id}
      className="todo-details animate__animated animate__bounceIn "
    >
      
      <div className="box">


      <EditTitle todo={todo}/>
      <EditDuration todo={todo}/>
      <EditDate todo={todo}/>
        
        {/* <div className="flex-input">
        <input type="checkbox" className="toggle" onClick={handleToggoleDate} />
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
          <button className="btn" onClick={handleEdit}>
            Edit Deadline
          </button>
        </div>
        </div> */}
        
        {/* <div className="flex-input">
        <input type="checkbox" className="toggle" onClick={handleToggoleDuration} />
        <div className={!hiddenDuration ? "hide" : ""} >
        <h3>Duration: {todo.duration} </h3>
        </div>
       
        <div className={hiddenDuration ? "hide" : ""} >
          <input
          defaultValue={todo.duration}
            type="text"
            className="input updated-duration"
            onChange={(e) => setDuration(e.target.value)}
          />
          <button className="btn" onClick={handleEdit}>
            Edit Duration
          </button>
        </div>
        </div> */}
        
        <div className="flex-input">
        <CompletedTodo todo={todo} />
        </div>
        <h3>
          Created{" "}
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </h3>
        <button className="material-symbols-outlined" onClick={handleClick}>
          Delete{" "}
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;
