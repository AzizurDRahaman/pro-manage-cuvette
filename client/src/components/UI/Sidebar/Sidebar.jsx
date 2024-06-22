import React from 'react'
import logo from "../../../assets/images/icon.png"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.container}>
        <section className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} />
                <h2>Pro Manage</h2>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li className={styles.active}><MdOutlineSpaceDashboard size="1.5rem" />Board</li>
                    <li><LuDatabase size="1.5rem"/> Analytics</li>
                    <li><IoSettingsOutline size="1.5rem"/> Settings</li>
                </ul>
            </div>
        </section>
        <section className={styles.logout}>
            <p> <HiOutlineArrowRightOnRectangle size="1.5rem"/> Log Out</p>
        </section>
    </aside>
  )
}
