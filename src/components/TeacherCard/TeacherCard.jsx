// TeacherCard.jsx
import React from 'react';
import './styles/TeacherCard.css';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <img src={teacher.image} alt={`${teacher.name}`} />
      <h3>{teacher.name}</h3>
      <p>{teacher.subject}</p>
      <p>{teacher.qualification}</p>
    </div>
  );
};

export default TeacherCard;
