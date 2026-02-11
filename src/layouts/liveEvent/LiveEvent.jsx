import { useState, useEffect } from "react";
import styles from "./LiveEvent.module.scss";
import { Link } from "react-router-dom";

const LiveEventPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const eventImage = "https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-6/630987831_1424769946105723_4906924420555463054_n.jpg?stp=dst-jpg_p843x403_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d810dS2_ou4Q7kNvwEoq-qU&_nc_oc=Adkvih0CL1AshunSgTQruUUBxVh30cmmKfNTztK_rvdrAO5RRf35P_nK6vqC0bdwbCXW4yZKs4hTsvc-v5xbpVuf&_nc_zt=23&_nc_ht=scontent-sin6-3.xx&_nc_gid=wOXX-OPvtGJMYFD2YwNRaw&oh=00_AftIl6ezCsXjAHIEuMSkBMkbgPpNxSijofbWjMIuOnsE1g&oe=6992A1B7";

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
