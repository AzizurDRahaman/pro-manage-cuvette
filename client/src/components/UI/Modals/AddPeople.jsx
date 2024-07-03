import React, { useState } from "react";
import Button from "../Buttons/Button";
import styles from "./AddPeople.module.css";
import { BASE_URL } from "../../../constants";
import { toast } from "react-toastify";

export default function AddPeople({ onClose }) {
    const [ email, setEmail ] = useState("");
    const [ success, setSuccess ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            userId: localStorage.getItem("userId"),
        }
        const response = await fetch(`${BASE_URL}/auth/add`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.status === 200) {
            setSuccess(true);
        } else {
            toast.error(data.message);
            setSuccess(false);
        }
    };



    if(success) 
    return(
        <div className={`modal ${styles.successModal}`}>
            <h3>{email} added to board</h3>
            <Button fill="filled" color="#17A2B8" className={styles.btn} onClick={onClose}>
            Okay, got it!
          </Button>
        </div>
    )
  return (
    <div className={`modal ${styles.modal}`}>
      <h3>Add people to the board</h3>
      <form className={styles.form}>
        <input type="email" placeholder="Enter the email" onChange={(e) => setEmail(e.target.value)} />
        <div className={styles["btn-container"]}>
          <Button fill="outlined" color="#CF3636" onClick={onClose}>
            Cancel
          </Button>
          <Button fill="filled" color="#17A2B8" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
