import React, { useState } from 'react';
import styles from './styles/newsEvent.module.css'; 
import Button from '../Core/Button';

const NewsCard = ({ image, title, date, time, content }) => {
    const [showModal, setShowModal] = useState(false);

    // Toggle modal visibility
    const handleReadMore = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={styles.newsCard}>
            <img src={image} alt={title} className={styles.newsCardImage} />
            <div className={styles.newsCardContent}>
                <h4 className={styles.schoolName}>School Name</h4> {/* Constant school name */}
                <h3 className={styles.newsTitle}>{title}</h3>
                <p className={styles.newsDateTime}>
                    {date} - {time}
                </p>
                <p className={styles.newsDescription}>
                    {content.slice(0, 100)}... {/* Only show first 100 characters */}
                </p>
                <Button className={styles.readMoreBtn} onClick={handleReadMore}>Read More</Button>
            </div>

            {/* Modal for full news/blog content */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleReadMore}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Image at the top */}
                        <img src={image} alt={title} className={styles.modalImage} />

                        {/* School name watermark */}
                        <div className={styles.modalWatermark}>
                            <h4 className={styles.schoolNameModal}>School Name</h4>
                        </div>

                        {/* Title and content */}
                        <h3>{title}</h3>
                        <p>{content}</p>

                        {/* Date at the bottom */}
                        <p className={styles.modalDate}>
                            {date} - {time}
                        </p>

                        <button className={styles.closeBtn} onClick={handleReadMore}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsCard;
