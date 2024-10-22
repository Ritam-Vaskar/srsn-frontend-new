// TeacherCard.jsx
import React from 'react';
import styles from './styles/TeacherCard.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TeacherCard = ({ teacher }) => {
  const currentYear = new Date().getFullYear();
  const JoiningYear = new Date(teacher.DateOfJoining).getFullYear();
  // console.log(teacher.DateOfJoining);
  const user = useSelector(state => state?.user?.user);
  return (
    <div className={styles.teacher_card}>
      <img src={teacher.profilePic} alt={`${teacher.name}`} />
      <h3>{teacher.name}</h3>
      <p>{teacher.DateofJoining}</p>
      <p>{teacher.Qualification}</p>
      <p>Years : {JoiningYear} - {currentYear}</p>
      {(user&&user._id)?<>
        <p>Contact Details: <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>
      </>:<>
      <Link to='/school/login'>Login to get Teacher Contact details</Link></>}
    </div>
  );
};

export default TeacherCard;
