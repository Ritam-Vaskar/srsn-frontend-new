import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from './../../../common/index';
import styles from './AdmissionNotice.module.scss'; // Importing SCSS module for styling

const AdmissionNotice = () => {
    const [admissionNotice, setAdmissionNotice] = useState(null);

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
                // Filter for admission notices
                const admissionNotices = data.notice.filter(
                    (notice) => notice.sendbody === "Admission"
                );

                // Set the latest admission notice, if any
                if (admissionNotices.length > 0) {
                    setAdmissionNotice(admissionNotices[0]);
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
            {admissionNotice && (
                <div className={styles.admissionNotice}>
                    <p>{admissionNotice.name}</p>
                </div>
            )}
        </>
    );
};

export default AdmissionNotice;
