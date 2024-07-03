import React, { useContext, useState } from "react";
import { GoDotFill } from "react-icons/go";
import styles from "./AddTask.module.css";
import { FaTrash } from "react-icons/fa";
import Button from "../Buttons/Button";
import { BASE_URL } from "../../../constants.js";
import { toast } from "react-toastify";
import { TaskContext } from "../../../TaskContext/TaskContext.jsx";

export default function AddTask({ onClose }) {
  const { todo } = useContext(TaskContext);
  const [ data, setData ] = useState({
    title:"",
    priority:"",
    dueDate:"",
  });
  const [task, setTask] = useState([
    {
      task: "",
      completed: false,
    },
  ]);

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

  const prioritySelector = (priority) => () => {
    setData({ ...data, priority: priority });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!data.title || !data.priority) {
      toast.error("Please fill all the fields");
      return;
    }
    if(task.length <3) {
      toast.error("Please add atleast Three task");
      return;
    }
    if (task.some(item => item.task.trim() === "")) {
      toast.error("All tasks in the checklist must have a description");
      return;
    }
    const formData = {
      ...data,
      dueDate: data.dueDate && new Date(data.dueDate).toISOString(),
      task
    }
    const response = await fetch(`${BASE_URL}/task/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    const data2 = await response.json();
    if (response.status === 201) {
      toast.success("Task created successfully");
    } else {
      toast.error(data2.message);
      return;
    }
    todo.push(data2.task);
    onClose();
  };

  return (
    <div className="modal">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>
          Title <sup>*</sup>
        </h3>
        <input type="text" placeholder="Enter Task Title" onChange={(e) => setData({ ...data, title: e.target.value })} />
        <div className={styles.priority}>
          <h3>
            Select Priority <sup>*</sup>
          </h3>
          <div onClick={prioritySelector("high")} className={`${data.priority === "high" ? styles.active : ""}`}>
            <span>
              <GoDotFill
                size="1rem"
                style={{ color: getPriorityColor("high") }}
              />
            </span>
            HIGH PRIORITY
          </div>
          <div onClick={prioritySelector("medium")} className={`${data.priority === "medium" ? styles.active : ""}`}>
            <span>
              <GoDotFill
                size="1rem"
                style={{ color: getPriorityColor("medium") }}
              />
            </span>
            MEDIUM PRIORITY
          </div>
          <div onClick={prioritySelector("low")} className={`${data.priority === "low" ? styles.active : ""}`}>
            <span>
              <GoDotFill
                size="1rem"
                style={{ color: getPriorityColor("low") }}
              />
            </span>
            LOW PRIORITY
          </div>
        </div>
        <div className={styles.checklistContainer}>
          <h3>
            Checklist (0/0) <sup>*</sup>{" "}
          </h3>
          {task.map((item, index) => (
            <div key={index} className={styles.checklist}>
              <input type="checkbox" onChange={() => setTask(task.map((item, i) => i === index ? { ...item, completed: !item.completed } : item))} />
              <input type="text" placeholder="Add Task" onChange={(e) => setTask(task.map((item, i) => i === index ? { ...item, task: e.target.value } : item))} />
              <FaTrash
                onClick={() => setTask(task.filter((_, i) => i !== index))}
                style={{ cursor: "pointer", color: "red" }}
              />
            </div>
          ))}
          <span
            onClick={() => setTask([...task, { task: "", completed: false }])}
          >
            {" "}
            + Add new{" "}
          </span>
        </div>
        <div className={styles.btnContainer}>
          <input type="date" placeholder="Due Date" onChange={(e) => setData({ ...data, dueDate: e.target.value })} />
          <div className={styles.buttons}>
            <Button onClick={onClose} fill="outlined" color="red">
              Cancel
            </Button>
            <Button fill="filled" color="#17A2B8" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
