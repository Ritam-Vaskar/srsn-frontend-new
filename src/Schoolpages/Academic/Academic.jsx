import React from 'react'
import Result from './../../sections/Academic/ResultAnalysis/Result'
import Syllabus from './../../sections/Academic/Syllabus/Sylabus'
import BookList from './../../sections/Academic/BookList/BookList'
import HolidayNotice from './../../sections/Academic/HolidayNotice/HolidayNotice'
import Routine from './../../sections/Academic/ClassRoutine/Routine'

import styles from './Academic.module.scss'
import { useState } from 'react'

const Academic = () => {
    const [isPrimary, setIsPrimary] = useState(true);
    return (

        <div className={styles.academicContainer}>

            <div className={styles.toggleButtons}>
                <p
                    className={isPrimary ? styles.selected : ''}
                    onClick={() => setIsPrimary(true)}
                >
                    Primary School
                </p>
                <p
                    className={!isPrimary ? styles.selected : ''}
                    onClick={() => setIsPrimary(false)}
                >
                    Secondary School
                </p>
            </div>

            <div className={styles.section}>
                <section id='result'>
                    <Result />
                </section>
                <section id='syllabus'>
                    <Syllabus flag={isPrimary}/>
                </section>
                <section id='booklist'>
                    <BookList flag={isPrimary}/>
                </section>
                <section id='routine'>
                    <Routine flag={isPrimary}/>
                </section>
                <section id='holiday'>
                    <HolidayNotice />
                </section>
            </div>
        </div>
    )
}

export default Academic
