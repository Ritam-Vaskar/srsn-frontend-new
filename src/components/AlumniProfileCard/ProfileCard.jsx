import React, { useState, useEffect } from 'react';
import styles from './styles/ProfileCard.module.scss';
import { 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaGraduationCap
} from 'react-icons/fa';
import { Blurhash } from 'react-blurhash';

const AlumniCard = ({ alumni, viewMode = 'grid' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getSocialIcon = (link) => {
    if (link.includes("facebook.com")) return <FaFacebook />;
    if (link.includes("linkedin.com")) return <FaLinkedin />;
    if (link.includes("twitter.com")) return <FaTwitter />;
    if (link.includes("instagram.com")) return <FaInstagram />;
    return <FaGlobe />;
  };

  const getSocialPlatform = (link) => {
    if (link.includes("facebook.com")) return "Facebook";
    if (link.includes("linkedin.com")) return "LinkedIn";
    if (link.includes("twitter.com")) return "Twitter";
    if (link.includes("instagram.com")) return "Instagram";
    return "Website";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const yearRange = `${alumni.startingYear} - ${alumni.endingYear}`;
  const duration = alumni.endingYear - alumni.startingYear;

  if (viewMode === 'list') {
    return (
      <>
        <div className={styles.alumniListItem}>
          <div className={styles.listImageContainer}>
            {!imageLoaded && (
              <Blurhash
                hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                width={80}
                height={80}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className={styles.listProfilePic}
              />
            )}
            <img
              src={alumni.profilePic}
              alt={alumni.name}
              className={`${styles.listProfilePic} ${imageLoaded ? styles.imageVisible : ''}`}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
          
          <div className={styles.listContent}>
            <div className={styles.listHeader}>
              <h3 className={styles.listName}>{alumni.name}</h3>
              <div className={styles.listMeta}>
                <span className={styles.listDesignation}>
                  <FaBriefcase /> {alumni.designation}
                </span>
                <span className={styles.listLocation}>
                  <FaMapMarkerAlt /> {alumni.currentState}
                </span>
                <span className={styles.listYears}>
                  <FaGraduationCap /> {yearRange}
                </span>
              </div>
            </div>
            
            <p className={styles.listBio}>{alumni.bioData}</p>
            
            <div className={styles.listActions}>
              <div className={styles.listSocialLinks}>
                {alumni.socialMediaLinks.slice(0, 3).map((link, index) => (
                  link ? (
                    <a 
                      href={link} 
                      key={index} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      title={getSocialPlatform(link)}
                    >
                      {getSocialIcon(link)}
                    </a>
                  ) : null
                ))}
              </div>
              <button onClick={openModal} className={styles.listKnowMoreButton}>
                View Profile
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleModalClick}>
            <div className={styles.modalBox}>
              <button onClick={closeModal} className={styles.closeButton}>
                ×
              </button>
              
              <div className={styles.modalHeader}>
                <div className={styles.modalImageContainer}>
                  {!imageLoaded && (
                    <Blurhash
                      hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                      width={120}
                      height={120}
                      resolutionX={32}
                      resolutionY={32}
                      punch={1}
                      className={styles.modalProfilePic}
                    />
                  )}
                  <img
                    src={alumni.profilePic}
                    alt={alumni.name}
                    className={`${styles.modalProfilePic} ${imageLoaded ? styles.imageVisible : ''}`}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                  />
                </div>
                <div className={styles.modalNameSection}>
                  <h2>{alumni.name}</h2>
                  <p className={styles.modalDesignation}>{alumni.designation}</p>
                </div>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <FaGraduationCap className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Academic Years</span>
                      <span className={styles.infoValue}>{yearRange} ({duration} years)</span>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <FaMapMarkerAlt className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Current Location</span>
                      <span className={styles.infoValue}>{alumni.currentState}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.bioSection}>
                  <h4>About</h4>
                  <p>{alumni.bioData}</p>
                </div>

                <div className={styles.modalSocialLinks}>
                  <h4>Connect</h4>
                  <div className={styles.socialGrid}>
                    {alumni.socialMediaLinks.map((link, index) => (
                      link ? (
                        <a 
                          href={link} 
                          key={index} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                        >
                          {getSocialIcon(link)}
                          <span>{getSocialPlatform(link)}</span>
                        </a>
                      ) : null
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div 
        className={`${styles.alumniCard} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.cardHeader}>
          <div className={styles.imageContainer}>
            {!imageLoaded && (
              <Blurhash
                hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                width={120}
                height={120}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className={styles.profilePic}
              />
            )}
            <img
              src={alumni.profilePic}
              alt={alumni.name}
              className={`${styles.profilePic} ${imageLoaded ? styles.imageVisible : ''}`}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            <div className={styles.graduationBadge}>
              <FaGraduationCap />
              <span>{alumni.endingYear}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.alumniName}>{alumni.name}</h3>
          <p className={styles.designation}>
            <FaBriefcase className={styles.icon} />
            {alumni.designation}
          </p>
          <p className={styles.location}>
            <FaMapMarkerAlt className={styles.icon} />
            {alumni.currentState}
          </p>
          <p className={styles.years}>
            <FaCalendarAlt className={styles.icon} />
            {yearRange}
          </p>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.socialPreview}>
            {alumni.socialMediaLinks.slice(0, 3).map((link, index) => (
              link ? (
                <a 
                  href={link} 
                  key={index} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  onClick={(e) => e.stopPropagation()}
                >
                  {getSocialIcon(link)}
                </a>
              ) : null
            ))}
            {alumni.socialMediaLinks.filter(link => link).length > 3 && (
              <span className={styles.moreLinks}>
                +{alumni.socialMediaLinks.filter(link => link).length - 3}
              </span>
            )}
          </div>
          <button onClick={openModal} className={styles.knowMoreButton}>
            View Profile
          </button>
        </div>

        <div className={styles.cardOverlay}>
          <div className={styles.overlayContent}>
            <p className={styles.bioPreview}>{alumni.bioData}</p>
            <button onClick={openModal} className={styles.overlayButton}>
              Learn More About {alumni.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleModalClick}>
          <div className={styles.modalBox}>
            <button onClick={closeModal} className={styles.closeButton}>
              ×
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalImageContainer}>
                {!imageLoaded && (
                  <Blurhash
                    hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                    width={120}
                    height={120}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className={styles.modalProfilePic}
                  />
                )}
                <img
                  src={alumni.profilePic}
                  alt={alumni.name}
                  className={`${styles.modalProfilePic} ${imageLoaded ? styles.imageVisible : ''}`}
                  onLoad={handleImageLoad}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
              </div>
              <div className={styles.modalNameSection}>
                <h2>{alumni.name}</h2>
                <p className={styles.modalDesignation}>{alumni.designation}</p>
              </div>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <FaGraduationCap className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Academic Years</span>
                    <span className={styles.infoValue}>{yearRange} ({duration} years)</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <FaMapMarkerAlt className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Current Location</span>
                    <span className={styles.infoValue}>{alumni.currentState}</span>
                  </div>
                </div>
              </div>

              <div className={styles.bioSection}>
                <h4>About</h4>
                <p>{alumni.bioData}</p>
              </div>

              <div className={styles.modalSocialLinks}>
                <h4>Connect</h4>
                <div className={styles.socialGrid}>
                  {alumni.socialMediaLinks.map((link, index) => (
                    link ? (
                      <a 
                        href={link} 
                        key={index} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        {getSocialIcon(link)}
                        <span>{getSocialPlatform(link)}</span>
                      </a>
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlumniCard;