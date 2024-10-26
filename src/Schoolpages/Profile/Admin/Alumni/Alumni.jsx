import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AlumniCard from '../../../../components/AlumniProfileCard/ProfileCard';
import SummaryApi from '../../../../common';
import styles from './styles/Alumni.module.scss';

const AlumniPanel = () => {
    const [alumniList, setAlumniList] = useState([]);
    
    // Fetch alumni data on component mount
    useEffect(() => {
        fetchAlumniData();
    }, []);

    const fetchAlumniData = async () => {
        try {
            const response = await fetch(SummaryApi.AlumniFetch.url, {
                method: SummaryApi.AlumniFetch.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            setAlumniList(data.alumni);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch alumni data");
        }
    };

    const handleAccept = async (alumniId) => {
        try {
            const response = await fetch(`${SummaryApi.AcceptAlumni.url}/${alumniId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Alumni accepted!");
                setAlumniList(prev => prev.filter(alumni => alumni._id !== alumniId));
            } else {
                toast.error(result.message || "Failed to accept alumni");
            }
        } catch (error) {
            toast.error("Error accepting alumni");
        }
    };

    const handleDecline = async (alumniId) => {
        try {
            const response = await fetch(`${SummaryApi.DeclineAlumni.url}/${alumniId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Alumni declined");
                setAlumniList(prev => prev.filter(alumni => alumni._id !== alumniId));
            } else {
                toast.error(result.message || "Failed to decline alumni");
            }
        } catch (error) {
            toast.error("Error declining alumni");
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
