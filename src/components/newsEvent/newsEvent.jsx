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
        <>
            <div className={styles.newsCard}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={title} className={styles.newsCardImage} />
                    <div className={styles.imageOverlay}>
                        <div className={styles.categoryBadge}>News</div>
                    </div>
                </div>
                
                <div className={styles.newsCardContent}>
                    <div className={styles.contentHeader}>
                        <h4 className={styles.schoolName}>Sri Ramakrishna Siksha Niketan</h4>
                        <div className={styles.dateTime}>
                            <span className={styles.date}>{date}</span>
                            <span className={styles.time}>{time}</span>
                        </div>
                    </div>
                    
                    <h3 className={styles.newsTitle}>{title}</h3>
                    
                    <p className={styles.newsDescription}>
                        {content.slice(0, 120)}...
                    </p>
                    
                    <div className={styles.cardFooter}>
                        <button className={styles.readMoreBtn} onClick={handleReadMore}>
                            <span>Read More</span>
                            <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <div className={styles.readingTime}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>{Math.ceil(content.length / 200)} min read</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleReadMore}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={handleReadMore}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        
                        <div className={styles.modalHeader}>
                            <img src={image} alt={title} className={styles.modalImage} />
                            <div className={styles.modalBadge}>Breaking News</div>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.modalMeta}>
                                <h4 className={styles.schoolNameModal}>Sri Ramakrishna Siksha Niketan</h4>
                                <div className={styles.modalDateTime}>
                                    <span>{date}</span> • <span>{time}</span>
                                </div>
                            </div>

                            <h2 className={styles.modalTitle}>{title}</h2>
                            
                            <div className={styles.modalContent}>
                                <p className={styles.modalText}>{content}</p>
                            </div>

                            <div className={styles.modalFooter}>
                                <div className={styles.shareSection}>
                                    <span>Share this article:</span>
                                    <div className={styles.shareButtons}>
                                        <button className={styles.shareBtn}>📱</button>
                                        <button className={styles.shareBtn}>📧</button>
                                        <button className={styles.shareBtn}>🔗</button>
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

export default NewsCard;