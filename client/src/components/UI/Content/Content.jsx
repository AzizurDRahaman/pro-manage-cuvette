import React, { useContext, useState } from "react";
import styles from "./Content.module.css";
import { FaPlus } from "react-icons/fa6";
import { VscCollapseAll } from "react-icons/vsc";
import TaskCard from "../Cards/TaskCard";
import { TaskContext } from "../../../TaskContext/TaskContext";
import Modal from '@mui/material/Modal';
import AddTask from "../Modals/AddTask";

export default function Content({ id }) {
  const { backlog, todo, progress, done } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={styles.body} id={id}>
        <div className={styles.heading}>
          {id === "backlog" && <h5> Backlog </h5>}
          {id === "todo" && <h5> To do </h5>}
          {id === "progress" && <h5> In progress </h5>}
          {id === "done" && <h5> Done </h5>}
          <span  style={{ cursor: "pointer" }}>
            {id === "todo" && <FaPlus onClick={handleOpen} />}
            <VscCollapseAll />
          </span>
        </div>
        <div className={styles.tasks}>
          {id === "backlog" &&
            backlog.map((task) => <TaskCard taskId={task._id} key={task._id} />)}
          {id === "todo" &&
            todo.map((task) => <TaskCard taskId={task._id} key={task._id} />)}
          {id === "progress" &&
            progress.map((task) => <TaskCard taskId={task._id} key={task._id} />)}
          {id === "done" &&
            done.map((task) => <TaskCard taskId={task._id} key={task._id} />)}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <AddTask onClose={handleClose} />
      </Modal>
    </>
  );
}
