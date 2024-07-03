import React, { useState } from "react";
import { RiGroupLine } from "react-icons/ri";
import styles from "./Header.module.css";
import Modal from '@mui/material/Modal';
import AddPeople from "../Modals/AddPeople";

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const date = new Date();
  const formattedDate = formatDate(date);
  return (
    <>
      <div className={styles.container}>
        <section className={styles.heading}>
          <h2>Welcome! {localStorage.getItem("name")}</h2>
          <p>{formattedDate}</p>
        </section>
        <section className={styles.board}>
          <div>
            <h1>Board</h1>
            <span onClick={handleOpen} style={{ cursor: "pointer" }}>
              <RiGroupLine />
              {"     "}
              Add people
            </span>
          </div>
          <select defaultValue="week">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </section>
      </div>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <AddPeople onClose={handleClose}/>
        </Modal>
    </>
  );
}
