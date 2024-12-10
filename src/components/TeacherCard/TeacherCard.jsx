import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles/TeacherCard.module.scss';

const TeacherCard = ({ teacher, customStyles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const joiningYear = new Date(teacher.DateOfJoining).getFullYear();
  const user = useSelector(state => state?.user?.user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.teacherCard} style={customStyles?.card}>
      <img src={teacher.profilePic} alt={teacher.name} className={styles.profilePic} style={customStyles?.profilePic} />
      <h3 style={customStyles?.name}>{teacher.name}</h3>
      <p style={customStyles?.qualification}><strong>Qualification:</strong> {teacher.Qualification}</p>

      <button 
        onClick={openModal} 
        className={styles.knowMoreButton} 
        style={customStyles?.knowMoreButton}>
        Know More
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay} style={customStyles?.overlay}>
          <div className={styles.modalBox} style={customStyles?.modalBox}>
            <button onClick={closeModal} className={styles.closeButton} style={customStyles?.closeButton}>X</button>
            <img src={teacher.profilePic} alt={teacher.name} className={styles.modalProfilePic} style={customStyles?.modalProfilePic} />
            <h3 style={customStyles?.modalName}>{teacher.name}</h3>
            
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <th>Designation:</th>
                  <td>{(teacher.grade)[0].toUpperCase() + (teacher.grade).slice(1)} School</td>
                </tr>
             
                <tr>
                  <th>Qualification:</th>
                  <td>{teacher.Qualification}</td>
                </tr>
                <tr>
                  <th>Date of Joining:</th>
                  <td>{teacher.DateOfJoining}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td><a href={`mailto:${teacher.email}`} style={customStyles?.email}>Click Here to Mail {teacher.name}</a></td> 
                </tr>
              
                {/* {user && user._id && (
                  <tr>
                    <th>Contact:</th>
                    <td><a href={`mailto:${teacher.email}`} style={customStyles?.email}>{teacher.email}</a></td>
                  </tr>
                )} */}
              </tbody>
            </table>

            <div className={styles.socialLinks} style={customStyles?.socialLinks}>
              {teacher.socialMediaLinks?.map((link, index) => (
                <a href={link} key={index} target="_blank" rel="noopener noreferrer">Social Link {index + 1}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCard;
