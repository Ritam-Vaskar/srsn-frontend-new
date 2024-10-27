import React from 'react'
import NoticeBar from './NoticeBar/NoticeBar'
import NoticeList from './NoticeList/Notice'
import styles from './Notice.module.scss'

const Notice = () => {
  return (
    <div className={styles.container}>
      
      <NoticeList />
      <NoticeBar />
    </div>
  )
}

export default Notice
