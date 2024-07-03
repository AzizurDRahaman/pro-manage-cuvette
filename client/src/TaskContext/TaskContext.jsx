import React, { createContext, useState, useEffect, useContext } from "react";
import { BASE_URL } from "../constants";
import { AuthContext } from "../AuthContext/AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const {isAuthenticated} = useContext(AuthContext);
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  
  const fetchBacklogTasks = async()=>{
    if(!isAuthenticated) return;
    const response = await fetch(`${BASE_URL}/task/get-status?status=backlog`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    setBacklog(data.tasks);
  }
  const fetchTodoTasks = async()=>{
    if(!isAuthenticated) return;
    const response = await fetch(`${BASE_URL}/task/get-status?status=todo`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    setTodo(data.tasks);
  }
  const fetchProgressTasks = async()=>{
    if(!isAuthenticated) return;
    const response = await fetch(`${BASE_URL}/task/get-status?status=progress`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    setProgress(data.tasks);
  }
  const fetchDoneTasks = async()=>{
    if(!isAuthenticated) return;
    const response = await fetch(`${BASE_URL}/task/get-status?status=done`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    setDone(data.tasks);
  }

  useEffect(()=>{
    fetchBacklogTasks();
    fetchTodoTasks();
    fetchProgressTasks();
    fetchDoneTasks();
  },[])

  return (
    <TaskContext.Provider
      value={{
        backlog,
        setBacklog,
        todo,
        setTodo,
        progress,
        setProgress,
        done,
        setDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
