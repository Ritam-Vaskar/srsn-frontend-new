import React, { useState } from 'react';
import styles from './styles/ProfileCard.module.scss';

const AlumniCard = ({ alumni }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.alumniCard}>
      <img src={alumni.profilePic} alt={alumni.name} className={styles.profilePic} />
      <h3>{alumni.name}</h3>
      <p><strong>Years:</strong> {alumni.startingYear} - {alumni.endingYear}</p>
      <button onClick={openModal} className={styles.knowMoreButton}>Know More</button>

      {/* Inline Modal Implementation */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button onClick={closeModal} className={styles.closeButton}>X</button>
            <img src={alumni.profilePic} alt={alumni.name} className={styles.modalProfilePic} />
            <h3>{alumni.name}</h3>
            <p><strong>Designation:</strong> {alumni.designation}</p>
            <p><strong>Years:</strong> {alumni.startingYear} - {alumni.endingYear}</p>
            <p><strong>Location:</strong> {alumni.currentState}</p>
            <p>{alumni.bioData}</p>
            <div className={styles.socialLinks}>
              {alumni.socialMediaLinks.map((link, index) => (
                <a href={link} key={index} target="_blank" rel="noopener noreferrer">Link {index + 1}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniCard;
