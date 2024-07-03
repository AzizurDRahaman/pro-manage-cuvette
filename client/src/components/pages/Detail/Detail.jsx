import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Routes, Route, useParams } from 'react-router-dom';
import { BASE_URL } from "../../../constants";
import { toast } from "react-toastify";
import { format, isBefore, parseISO } from 'date-fns';
import styles from "./Detail.module.css";

export default function Detail() {
    const [ task, setTask ] = useState({
        title: "",
        priority: "",
        assignedTo: "",
        dueDate: "",
        status: "",
      });
      const [checklist, setChecklist] = useState([]);

      let { taskId } = useParams();
      console.log(taskId);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF2473";
      case "medium":
        return "#18B0FF";
      case "low":
        return "#63C05B";
      default:
        return "black"; // Default color if priority is undefined or unexpected
    }
  };
  const getCompletedTasksCount = () => {
    return checklist.filter(item => item.completed).length;
  };
  
  useEffect(()=>{
    const getTaskData = async () => {
      const response = await fetch(`${BASE_URL}/task/get-task/${taskId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "authorization": localStorage.getItem("token"),
          },
      });
      const data = await response.json();

      if (response.status === 200) {
          setTask(data.task);
          setChecklist(data.task.checklist);
      } else {
          toast.error(data.message);
      }
  }

  getTaskData();
  },[taskId])

  const getDueDateColor = (dueDate, status) => {
    const today = new Date();
    const due = new Date(dueDate);
  
    if (status === "done") {
      return { backgroundColor: "#63C05B", color: "white" };
    }
  
    if (due < today) {
      return { backgroundColor: "#CF3636", color: "white" };
    }
  
    return { backgroundColor: "#DBDBDB", color: "black" };
  };
  const formatDate = (date) => {
    return format(parseISO(date), 'MMM do'); // e.g., Feb 10th
  }
  return (
    <div className={styles.body}>
      <div>
        <p>
          <GoDotFill
            size="1rem"
            style={{ color: getPriorityColor(task.priority) }}
          />
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
          Priority
          {task.assignedTo !== "unassigned" && (
            <span>{task.assignedTo.slice(0, 2).toUpperCase()}</span>
          )}
        </p>
      </div>
      <h1>{task.title}</h1>

      <div>
        <p>ChecList({getCompletedTasksCount()}/{checklist.length})</p>
        <ul>
              {checklist.map((item, index) => (
                <li key={item._id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                  />
                  {item.task}
                </li>
              ))}
            </ul>
      </div>
      <div>
        {task.dueDate && <p>Due Date <span style={getDueDateColor(task.dueDate, task.status)}>{formatDate(task.dueDate)}</span></p>}
      </div>
    </div>
  );
}
