import React, { useEffect, useState } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import styles from './styles/Teachers.module.scss';
import Spinner from '../../layouts/Loader/Spinner';

const KnowYourTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchTeachers = async () => {
    setLoading(true); 
    try {
      const response = await fetch(SummaryApi.TeacherFetch.url, {
        method: SummaryApi.TeacherFetch.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setTeachers(result.teacher || []); 
    } catch (err) {
      toast.error('Failed to fetch teachers.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Know Your Teachers</h2>
      {loading ? ( 
        <Spinner />
      ) : (
        <div className={styles.cards}>
          {teachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))}
        </div>
      )}
      {!loading && teachers.length === 0 && ( 
        <p className={styles.noTeachersMessage}>No teachers found.</p>
      )}
    </div>
  );
};

export default KnowYourTeacher;
