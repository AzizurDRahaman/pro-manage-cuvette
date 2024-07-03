import React, { useState } from 'react'
import logo from "../../../assets/images/icon.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styles from "./Sidebar.module.css";
import { Modal } from '@mui/material';
import Logout from '../Modals/Logout';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
    <aside className={styles.container}>
        <section className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} />
                <h2>Pro Manage</h2>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li onClick={() => navigate('/')} className={location.pathname === "/" ? styles.active : ""}><MdOutlineSpaceDashboard size="1.5rem" />Board</li>
                    <li onClick={() => navigate('/analytics')} 
                    className={location.pathname === "/analytics" ? styles.active : ""}
                    ><LuDatabase size="1.5rem"/> Analytics</li>
                    <li onClick={() => navigate('/settings')} className={location.pathname === "/settings" ? styles.active : ""}><IoSettingsOutline size="1.5rem"/> Settings</li>
                </ul>
            </div>
        </section>
        <section className={styles.logout} onClick={handleOpen}>
            <p> <HiOutlineArrowRightOnRectangle size="1.5rem"/> Log Out</p>
        </section>
    </aside>
    <Modal open={open} onClose={handleClose}>
        <Logout onClose={handleClose}/>
    </Modal>
    </>
  )
}
