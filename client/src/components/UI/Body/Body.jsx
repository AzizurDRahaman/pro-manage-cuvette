import React from 'react'
import Content from '../Content/Content'
import styles from './Body.module.css'

export default function Body() {
  return (
    <div className={styles.container}>
        <Content id="backlog"/>
        <Content id="todo"/>
        <Content id="progress"/>
        <Content id="done"/>
    </div>
  )
}
