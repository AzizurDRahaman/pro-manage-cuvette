import React from 'react'
import styles from './Home.module.css'
import Header from '../../UI/Header/Header'
import Body from '../../UI/Body/Body'

export default function Home() {
  return (
    <div className={styles.container}>
     <Header/>
     <Body/>
    </div>
  )
}
