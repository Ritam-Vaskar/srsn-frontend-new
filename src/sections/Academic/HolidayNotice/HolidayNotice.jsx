import React from 'react'
import HolidayLink from './../../../../public/HolidayNotice.json'
import styles from './HolidayNotice.module.scss'

const HolidayNotice = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.heading}>Holiday Data</h1>
      
      <table className={styles.table}>
        <thead className={styles.thead}>
            <tr>
                <th>Event</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody className={styles.tbody}>
            {HolidayLink.holidays.map((holiday) => (
                <tr key={holiday.event}>
                    <td>{holiday.event}</td>
                    <td>{holiday.date}</td>
                </tr>
            ))}
        </tbody>
      </table>

    </div>
  )
}

export default HolidayNotice
