import React, { useState, useEffect } from 'react';
import styles from './styles/ProfileCard.module.scss';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';
import { Blurhash } from 'react-blurhash';

const AlumniCard = ({ alumni }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getSocialIcon = (link) => {
    if (link.includes("facebook.com")) return <FaFacebook />;
    if (link.includes("linkedin.com")) return <FaLinkedin />;
    if (link.includes("twitter.com")) return <FaTwitter />;
    if (link.includes("instagram.com")) return <FaInstagram />;
    return <FaGlobe />;
  };

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={styles.alumniCard}>
      {/* Profile Image with Blurhash as a fallback */}
      {!imageLoaded && (
        <Blurhash
          hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj' // Provide the blurhash code from your data
          width={150}
          height={150}
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
        style={{ display: imageLoaded ? 'block' : 'none' }} // Hide the image until fully loaded
      />
      <h3>{alumni.name}</h3>
      <p><strong>Years:</strong> {alumni.startingYear} - {alumni.endingYear}</p>
      <button onClick={openModal} className={styles.knowMoreButton}>Know More</button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button onClick={closeModal} className={styles.closeButton}>X</button>
            {/* Modal Profile Image with Blurhash fallback */}
            {!imageLoaded && (
              <Blurhash
                hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                width={150}
                height={150}
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
            <h3>{alumni.name}</h3>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <td><strong>Designation:</strong></td>
                  <td>{alumni.designation}</td>
                </tr>
                <tr>
                  <td><strong>Years:</strong></td>
                  <td>{alumni.startingYear} - {alumni.endingYear}</td>
                </tr>
                <tr>
                  <td><strong>Location:</strong></td>
                  <td>{alumni.currentState}</td>
                </tr>
                <tr>
                  <td colSpan="2">{alumni.bioData}</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.socialLinks}>
              {alumni.socialMediaLinks.map((link, index) => (
                link ? (
                  <a href={link} key={index} target="_blank" rel="noopener noreferrer">
                    {getSocialIcon(link)}
                  </a>
                ) : null
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniCard;
