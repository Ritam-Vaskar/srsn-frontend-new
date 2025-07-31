import React, { useEffect, useState } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import styles from './styles/Teachers.module.scss';
import Spinner from '../../layouts/Loader/Spinner';
import ArunachalSir from './../../assets/images/c67aa7eb-c9c5-49c6-8a48-9fbf813daf57.jpeg';
import { makeAuthenticatedRequest } from '../../helper/tokenManager';

const KnowYourTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest(SummaryApi.TeacherFetch.url, {
        method: SummaryApi.TeacherFetch.method
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

      {/* Poster Section for Arunachal Sir */}
      <div className={styles.poster}>
        <img src={ArunachalSir} alt="Arunachal Chakraborty" className={styles.posterImage} />
        <h3 className={styles.posterName}>Late Arunachal Chakraborty</h3>
      </div>

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
