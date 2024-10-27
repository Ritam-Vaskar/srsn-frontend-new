import React, { useEffect, useState } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import styles from './styles/Teachers.module.scss';

const KnowYourTeacher = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(SummaryApi.TeacherFetch.url, {
        method: SummaryApi.TeacherFetch.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setTeachers(result.teacher);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Know Your Teachers</h2>
      <div className={styles.cards}>
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default KnowYourTeacher;
