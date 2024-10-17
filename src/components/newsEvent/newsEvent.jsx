import React, { useState } from 'react';
import './styles/newsEvent.css'; 
import Button from '../Core/Button';

const NewsCard = ({ image, title, date, time, content }) => {
    const [showModal, setShowModal] = useState(false);

    // Toggle modal visibility
    const handleReadMore = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="news-card">
            <img src={image} alt={title} className="news-card-image" />
            <div className="news-card-content">
                <h4 className="school-name">School Name</h4> {/* Constant school name */}
                <h3 className="news-title">{title}</h3>
                <p className="news-date-time">
                    {date} - {time}
                </p>
                <p className="news-description">
                    {content.slice(0, 100)}... {/* Only show first 100 characters */}
                </p>
                <Button className="read-more-btn" onClick={handleReadMore}>Read More</Button>
            </div>

            {/* Modal for full news/blog content */}
            {showModal && (
                <div className="modal-overlay" onClick={handleReadMore}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Image at the top */}
                        <img src={image} alt={title} className="modal-image" />

                        {/* School name watermark */}
                        <div className="modal-watermark">
                            <h4 className="school-name-modal">School Name</h4>
                        </div>

                        {/* Title and content */}
                        <h3>{title}</h3>
                        <p>{content}</p>

                        {/* Date at the bottom */}
                        <p className="modal-date">
                            {date} - {time}
                        </p>

                        <button className="close-btn" onClick={handleReadMore}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsCard;
