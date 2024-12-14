import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import styles from './TechnicalNav.module.scss'; // Importing SCSS module for styling

const TechnicalNav = () => {
    const [technicalNotice, setTechnicalNotice] = useState(null);

    // Fetch active notices
    const fetchActiveNotices = async () => {
        try {
            const response = await fetch(SummaryApi.NoticeFetch.url, {
                method: SummaryApi.NoticeFetch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            
            if (data.success) {
                // Filter for technical notices
                const techNotices = data.notice.filter(
                    (notice) => notice.sendbody === "Technical"
                );

                // Set the latest technical notice, if any
                if (techNotices.length > 0) {
                    setTechnicalNotice(techNotices[0]);
                    console.log(techNotices[0]);
                }
            } else {
                toast.error("Failed to fetch active notices.");
            }
        } catch (error) {
            toast.error("Error fetching notices.");
        }
    };

    // Use useEffect to fetch notices on component mount
    useEffect(() => {
        fetchActiveNotices();
    }, []);

    return (
        <>
            {technicalNotice && (
                <div className={styles.technicalNav}>
                    <p>{technicalNotice.name}</p>
                </div>
            )}
        </>
    );
};

export default TechnicalNav;
