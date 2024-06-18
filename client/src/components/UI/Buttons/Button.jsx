import React from 'react'
import styles from "./Button.module.css"

export default function Button({ children, fill, color, className, ...props }) {
    const styleClass = fill === 'outlined' ? styles.outlined : styles.filled;
    const buttonClass = `${styles.button} ${styleClass} ${className || ''}`.trim();
  return (
    <button {...props} className={buttonClass} style={{ '--color': color }}>{children}</button>
  )
}
