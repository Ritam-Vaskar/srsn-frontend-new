import { useState, useEffect } from "react";
import styles from "./LiveEvent.module.scss";
import { Link } from "react-router-dom";

const LiveEventPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const eventImage = "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6995d21ea6d7935be33164ad_WhatsApp%20Image%202026-02-18%20at%208.17.23%20PM%20(1).jpeg";

    useEffect(() => {
        // Check if the popup hasn't been displayed yet
        if (!sessionStorage.getItem("popupDisplayed")) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem("popupDisplayed", "true");
            }, 2500);

            // Cleanup timer on component unmount
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add(styles.lockScroll);
        } else {
            document.body.classList.remove(styles.lockScroll);
        }

        return () => {
            document.body.classList.remove(styles.lockScroll);
        };
    }, [isVisible]);

    const closePopup = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div className={`${styles.popup} ${styles.fadeIn}`}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={closePopup}>
                            ×
                        </button>
                            <img src={eventImage} alt="Event" className={styles.popupImage} />
                    </div>
                </div>
            )}
        </>
    );

};

export default LiveEventPopup;
