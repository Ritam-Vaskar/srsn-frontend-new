import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AlumniCard from '../../../../components/AlumniProfileCard/ProfileCard';
import SummaryApi from '../../../../common';
import styles from './styles/Alumni.module.scss';

const AlumniPanel = () => {
    const [alumniList, setAlumniList] = useState([]);

    // Fetch alumni applications on component mount
    useEffect(() => {
        fetchAlumniData();
    }, []);

    const fetchAlumniData = async () => {
        try {
            const response = await fetch(SummaryApi.AlumniApplicationFetch.url, {
                method: SummaryApi.AlumniApplicationFetch.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setAlumniList(data.alumni || []);
            } else {
                toast.error(data.message || "Failed to fetch alumni applications.");
            }
        } catch (err) {
            console.error("Error fetching alumni data:", err);
            toast.error("Failed to fetch alumni data.");
        }
    };

    const handleAccept = async (alumniId) => {
        try {
            const response = await fetch(SummaryApi.AlumniAccept.url, {
                method: SummaryApi.AlumniAccept.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ID: alumniId, check: "true" }), // Set ID and check explicitly
            });
            const result = await response.json();
            if (response.ok && result.success) {
                toast.success("Alumni accepted!");
                setAlumniList(prev => prev.filter(alumni => alumni._id !== alumniId));
            } else {
                toast.error(result.message || "Failed to accept alumni");
            }
        } catch (error) {
            console.error("Error in accepting alumni:", error);
            toast.error("Error accepting alumni.");
        }
    };

    const handleDecline = async (alumniId) => {
        try {
            const response = await fetch(SummaryApi.AlumniReject.url, {
                method: SummaryApi.AlumniReject.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ID: alumniId, check: "false" }), // Set ID and check explicitly
            });
            const result = await response.json();
            if (response.ok && result.success) {
                toast.success("Alumni declined");
                setAlumniList(prev => prev.filter(alumni => alumni._id !== alumniId));
            } else {
                toast.error(result.message || "Failed to decline alumni");
            }
        } catch (error) {
            console.error("Error in declining alumni:", error);
            toast.error("Error declining alumni.");
        }
    };

    return (
        <div className={styles.alumniPanel}>
            <h2>Alumni Management</h2>
            <div className={styles.alumniList}>
                {alumniList.map(alumni => (
                    <div key={alumni._id} className={styles.alumniCardContainer}>
                        <AlumniCard alumni={alumni} />
                        <div className={styles.actionButtons}>
                            <button onClick={() => handleAccept(alumni._id)} className={styles.acceptButton}>Accept</button>
                            <button onClick={() => handleDecline(alumni._id)} className={styles.declineButton}>Decline</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlumniPanel;
