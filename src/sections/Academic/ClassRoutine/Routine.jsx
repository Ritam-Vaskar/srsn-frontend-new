import React from 'react'
import styles from './Routine.module.scss'
import PrimaryRoutineData from '../../../../public/ClassRoutinePrimary.json'
import SecondaryRoutineData from '../../../../public/ClassRoutineSecondary.json'
import CardComponent from './../../../components/ClassWiseCard/ClassWiseCard'


const Routine = ({flag}) => {
    let currentYear = new Date().getFullYear()
  return (
    <div>
      <CardComponent title1={`Class Routine for the Academic Year ${currentYear}`} title2="Class Routine of " Prischool={PrimaryRoutineData.routine} SecSchool={SecondaryRoutineData.routine} flag={flag} isImg={false} isDoc={true}/>
    </div>
  )
}

export default Routine
