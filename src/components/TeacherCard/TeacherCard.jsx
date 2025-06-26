import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles/TeacherCard.module.css';

const TeacherCard = ({ teacher, customStyles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const joiningYear = new Date(teacher.DateOfJoining).getFullYear();
  const experienceYears = currentYear - joiningYear;
  const user = useSelector(state => state?.user?.user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.teacherCard} style={customStyles?.card}>
        <div className={styles.imageContainer}>
          <img 
            src={teacher.profilePic} 
            alt={teacher.name} 
            className={styles.profileImage}
            style={customStyles?.profilePic}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.experienceBadge}>
              {experienceYears}+ Years
            </div>
          </div>
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.contentHeader}>
            <h4 className={styles.designation}>
              {(teacher.grade)[0].toUpperCase() + (teacher.grade).slice(1)} School
            </h4>
            <div className={styles.joinDate}>
              <span className={styles.joinYear}>{joiningYear}</span>
              <span className={styles.joinLabel}>Joined</span>
            </div>
          </div>
          
          <h3 className={styles.teacherName} style={customStyles?.name}>
            {teacher.name}
          </h3>
          
          <p className={styles.qualification}>
            <span className={styles.qualificationLabel}>Qualification:</span>
            <span className={styles.qualificationValue}>{teacher.Qualification}</span>
          </p>
          
          <div className={styles.cardFooter}>
            <button 
              onClick={openModal} 
              className={styles.knowMoreButton}
              style={customStyles?.knowMoreButton}
            >
              <span>Know More</span>
              <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            
            <div className={styles.experienceTime}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>{experienceYears} years exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal} style={customStyles?.overlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={customStyles?.modalBox}>
            <button onClick={closeModal} className={styles.closeBtn} style={customStyles?.closeButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className={styles.modalHeader}>
              <img 
                src={teacher.profilePic} 
                alt={teacher.name} 
                className={styles.modalImage}
                style={customStyles?.modalProfilePic}
              />
              <div className={styles.modalBadge}>Faculty Member</div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <h4 className={styles.modalDesignation}>
                  {(teacher.grade)[0].toUpperCase() + (teacher.grade).slice(1)} School Teacher
                </h4>
                <div className={styles.modalJoinDate}>
                  <span>Since {joiningYear}</span> • <span>{experienceYears} years experience</span>
                </div>
              </div>

              <h2 className={styles.modalTitle} style={customStyles?.modalName}>
                {teacher.name}
              </h2>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Qualification</span>
                  <span className={styles.infoValue}>{teacher.Qualification}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Date of Joining</span>
                  <span className={styles.infoValue}>{teacher.DateOfJoining}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Experience</span>
                  <span className={styles.infoValue}>{experienceYears} Years</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email Contact</span>
                  <a 
                    href={`mailto:${teacher.email}`} 
                    className={styles.emailLink}
                    style={customStyles?.email}
                  >
                    Contact {teacher.name}
                  </a>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.socialSection} style={customStyles?.socialLinks}>
                  <span>Connect with {teacher.name}:</span>
                  <div className={styles.socialButtons}>
                    {teacher.socialMediaLinks?.map((link, index) => (
                      <a 
                        href={link} 
                        key={index} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                      >
                        🔗
                      </a>
                    ))}
                    <a 
                      href={`mailto:${teacher.email}`}
                      className={styles.socialBtn}
                    >
                      📧
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherCard;