import React, { useContext } from "react";
import Button from "../Buttons/Button";
import styles from "./Logout.module.css";
import { AuthContext } from "../../../AuthContext/AuthContext";

export default function Logout({ onClose }) {
  const { handleLogout } = useContext(AuthContext);
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };
  return (
    <div className="modal">
      <h4>Are you sure you want to log out?</h4>
      <Button
        fill={"filled"}
        color="#17A2B8"
        className={styles.btn}
        onClick={handleLogoutClick}
      >
        {" "}
        Yes, Logout
      </Button>
      <Button
        fill="outlined"
        onClick={onClose}
        color="red"
        className={styles.btn}
      >
        Cancel
      </Button>
    </div>
  );
}
