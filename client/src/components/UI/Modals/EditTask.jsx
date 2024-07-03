import React, { useContext, useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import styles from "./AddTask.module.css";
import { FaTrash } from "react-icons/fa";
import Button from "../Buttons/Button";
import { BASE_URL } from "../../../constants.js";
import { toast } from "react-toastify";
import { TaskContext } from "../../../TaskContext/TaskContext.jsx";

export default function EditTask({ onClose, taskId, setTaskData }) {
    const { todo } = useContext(TaskContext);
    const [ user, setUser ] = useState({
        name: "",
        _id: "",
        email: "",
        peoples: []
    });
  const [ data, setData ] = useState({
    title: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
    status: "",
  });
  const [task, setTask] = useState([
    {
      task: "",
      completed: false,
    }
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

  useEffect(() => {
    const getUserInfo = async () => {
        const response = await fetch(`${BASE_URL}/auth/get/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        const data = await response.json();

        if (response.status === 200) {
            setUser(data);
        } else {
            toast.error(data.message);
        }
    }

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
            setData(data.task);
            setTask(data.task.checklist);
        } else {
            toast.error(data.message);
        }
    }

    getTaskData();
    getUserInfo();
  },[taskId])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...data,
      dueDate: data.dueDate && new Date(data.dueDate).toISOString(),
      task
    }

    console.log(formData);

    const response = await fetch(`${BASE_URL}/task/update-task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    const data2 = await response.json();
    if (response.status === 200) {
      toast.success("Task updated successfully");
      setTaskData(data2.task);
      onClose();
    } else {
      toast.error(data2.message);
    }
  }

  return (
    <div className="modal">
      <form className={styles.form} 
      onSubmit={handleSubmit}
      >
        <h3>
          Title <sup>*</sup>
        </h3>
        <input type="text" placeholder="Enter Task Title" onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} />
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
        <div className={styles.assign}>
          <h3>Assign to</h3>
          <select defaultValue="unassigned" onChange={(e) => setData({ ...data, assignedTo: e.target.value })} value={data.assignedTo}>
            {/* GET THE OPTIONS AND MAP TO OPTIONS */}
            <option value="unassigned">Add a assignee</option>
            {user.peoples.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles.checklistContainer}>
          <h3>
            Checklist (0/0) <sup>*</sup>{" "}
          </h3>
          {task.map((item, index) => (
            <div key={index} className={styles.checklist}>
              <input type="checkbox" onChange={() => setTask(task.map((item, i) => i === index ? { ...item, completed: !item.completed } : item))} checked={item.completed} />
              <input type="text" placeholder="Add Task" onChange={(e) => setTask(task.map((item, i) => i === index ? { ...item, task: e.target.value } : item))} value={item.task} />
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
          <input type="date" placeholder="Due Date" onChange={(e) => setData({ ...data, dueDate: e.target.value })} value={data.dueDate}/>
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
  )
}
