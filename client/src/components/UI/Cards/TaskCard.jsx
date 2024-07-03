import React, { useContext, useEffect, useState } from "react";
import styles from "./TaskCard.module.css";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { TaskContext } from "../../../TaskContext/TaskContext";
import { BASE_URL } from "../../../constants";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import EditTask from "../Modals/EditTask";
import { format, isBefore, parseISO } from 'date-fns';

export default function TaskCard({ taskId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checklist, setChecklist] = useState([]);
  const [ task, setTask ] = useState({
    title: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
    status: "",
  });
  const {
    backlog,
    todo,
    progress,
    done,
    setBacklog,
    setTodo,
    setProgress,
    setDone,
  } = useContext(TaskContext);

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

  // Handler to toggle the checkbox
  const handleCheckboxChange = async (index) => {
    // Create a new checklist array with the updated item

    try{
        const data = {
          ...task,
          checklist: checklist.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
          ),
        };
        // console.log(data);
        const response = await fetch(`${BASE_URL}/task/update-task/${task._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update task status");
        }
        const newChecklist = checklist.map((item, i) =>
          i === index ? { ...item, completed: !item.completed } : item
        );
    
        // Update the state
        setChecklist(newChecklist);
    }catch(e){
      toast.error(e.message);
    }


  };


  const getCompletedTasksCount = () => {
    return checklist.filter(item => item.completed).length;
  };

  const changeStatus = async (newStatus) => {
    const data = {
      ...task,
      status: newStatus,
    };
    // console.log(data);
    try {
      const response = await fetch(`${BASE_URL}/task/update-task/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update task status");
      }

      if (task.status === "todo") {
        setTodo(todo.filter((t) => t._id !== task._id));
      } else if (task.status === "backlog") {
        setBacklog(backlog.filter((t) => t._id !== task._id));
      } else if (task.status === "progress") {
        setProgress(progress.filter((t) => t._id !== task._id));
      } else if (task.status === "done") {
        setDone(done.filter((t) => t._id !== task._id));
      }

      task.status = newStatus;

      if (newStatus === "todo") {
        setTodo([...todo, task]);
      } else if (newStatus === "backlog") {
        setBacklog([...backlog, task]);
      } else if (newStatus === "progress") {
        setProgress([...progress, task]);
      } else if (newStatus === "done") {
        setDone([...done, task]);
      }

    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

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

  const availableStatuses = ["backlog", "todo", "progress", "done"].filter(
    (status) => status !== task.status
  );

  const formatDate = (date) => {
    return format(parseISO(date), 'MMM do'); // e.g., Feb 10th
  }

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


  const handleCopy = () => {
    // console.log(window.location.href);
    navigator.clipboard.writeText(`${window.location.href}task/${task._id}`);
    toast.success("Task copied to clipboard");
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.priority}>
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
          <details>
            <summary>
              <BsThreeDots />
            </summary>
            <ul>
              <li onClick={handleOpen}>Edit</li>
              <li onClick={handleCopy}>Share</li>
              <li>Delete</li>
            </ul>
          </details>
        </div>
        <h2>{task.title}</h2>
        <div className={styles.checklist}>
          <details>
            <summary>Checklist({getCompletedTasksCount()}/{checklist.length})</summary>
            <ul>
              {checklist.map((item, index) => (
                <li key={item._id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {item.task}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className={styles.capsule}>
          {task.dueDate && <span style={getDueDateColor(task.dueDate, task.status)}>{formatDate(task.dueDate)}</span>}
          {!task.dueDate && <span style={{ visibility: "hidden" }}></span>}
          <div>
            {availableStatuses.map((status) => (
              <span
                key={status}
                onClick={() => changeStatus(status)}
                style={{ cursor: "pointer" }}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
            <EditTask taskId={task._id} setTaskData={setTask} onClose={handleClose} />
      </Modal>
    </>
  );
}
