// components/Layout/Layout.js
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from "./Layout.module.css"

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
