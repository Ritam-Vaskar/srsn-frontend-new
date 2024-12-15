import { useState, useEffect } from "react";
import styles from "./LiveEvent.module.scss";
import SummaryApi from "../../common";
import { Link } from "react-router-dom";

const LiveEventPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEventOngoing, setIsEventOngoing] = useState(false);
    const [eventImage, setEventImage] = useState("");

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(SummaryApi.AdmissionFetch.url, {
                    method: SummaryApi.AdmissionFetch.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const fetchedData = await response.json();
                const fetchedEvent = fetchedData.admission;
                console.log(fetchedEvent);
                // Check if the event is ongoing and the popup hasn't been displayed yet
                if (fetchedEvent.isOngoing && !sessionStorage.getItem("popupDisplayed")) {
                    console.log(fetchedEvent);
                    setIsEventOngoing(true);
                    setEventImage(fetchedEvent.image);

                    const timer = setTimeout(() => {
                        setIsVisible(true);
                        sessionStorage.setItem("popupDisplayed", "true");
                    }, 2500);

                    // Cleanup timer on component unmount
                    return () => clearTimeout(timer);
                } else {
                    setIsEventOngoing(false);
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEventData();
    }, []);

    useEffect(() => {
        if (isVisible && isEventOngoing) {
            document.body.classList.add(styles.lockScroll);
        } else {
            document.body.classList.remove(styles.lockScroll);
        }

        return () => {
            document.body.classList.remove(styles.lockScroll);
        };
    }, [isVisible, isEventOngoing]);

    const closePopup = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isEventOngoing && (
                <div className={`${styles.popup} ${isVisible ? styles.fadeIn : ""}`}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={closePopup}>
                            ×
                        </button>
                        <Link to="/school/admission_form">
                            <img src={eventImage} alt="Event" className={styles.popupImage} />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );

};

export default LiveEventPopup;
