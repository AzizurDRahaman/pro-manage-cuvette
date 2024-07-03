import React, { useEffect, useState } from 'react'
import styles from './Analysis.module.css'
import { BASE_URL } from '../../../constants'

export default function Analysis() {
    const [ details, setDetails ] = useState({
        backlog: 0,
        todo: 0,
        in_progress: 0,
        completed: 0,
        high: 0,
        medium: 0,
        low: 0,
        due_date:0
    })
    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(`${BASE_URL}/task/get-details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json()
            setDetails(data);
        }
        getDetails();
    },[])
  return (
    <>
        <section className={styles.main}>
            <h1>Analytics</h1>
            <div className={styles.body}>
                <div className={styles.container}>
                    <ul>
                        <li><p><span>Backlog Tasks</span><span>{ details.backlog }</span></p></li>
                        <li><p><span>Todo Tasks</span><span>{ details.todo }</span></p></li>
                        <li><p><span>In-progress Tasks</span><span>{ details.in_progress }</span></p></li>
                        <li><p><span>Completed Tasks</span><span>{ details.completed }</span></p></li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li><p><span>Low Priority</span><span>{ details.low }</span></p></li>
                        <li><p><span>Medium Priority</span><span>{ details.medium }</span></p></li>
                        <li><p><span>High Priority</span><span>{ details.high }</span></p></li>
                        <li><p><span>Due Date Tasks</span><span>{ details.due_date }</span></p></li>
                    </ul>
                </div>
            </div>
        </section>
    </>
  )
}
