// Notice.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Notice.module.scss';
import SummaryApi from '../../../../common';
import { makeAuthenticatedRequest } from '../../../../helper/tokenManager';

const Notice = () => {
    const [notices, setNotices] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            url: '',
            name: '',
            sendbody: '',
            date: ''
        }
    });

    useEffect(() => {
        fetchActiveNotices();
    }, []);

    const fetchActiveNotices = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.NoticeFetch.url, {
                method: SummaryApi.NoticeFetch.method
            });
            const data = await response.json();
           
            if (data.success) {
                setNotices(data.notice.reverse());
                console.log(data.notice);
            } else {
                toast.error("Failed to fetch active notices.");
            }
        } catch (error) {
            toast.error("Error fetching notices.");
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.NoticeEntery.url, {
                method: SummaryApi.NoticeEntery.method,
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Notice created successfully!");
                fetchActiveNotices();
                // setNotices([...notices, result.notice]);
                reset();
            } else {
                toast.error("Failed to create notice.");
            }
        } catch (error) {
            toast.error("Error creating notice.");
        }
    };

    const handleDelete = async (noticeId) => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.NoticeDelete.url, {
                method: SummaryApi.NoticeDelete.method,
                body: JSON.stringify({ id: noticeId })
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Notice deleted successfully!");
                fetchActiveNotices();
                setNotices(notices.filter(notice => notice.id !== noticeId));
            } else {
                toast.error("Failed to delete notice.");
            }
        } catch (error) {
            toast.error("Error deleting notice.");
        }
    };

    return (
        <div className={styles.noticeContainer}>
            <h2>Create Notice</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.noticeForm}>
                <label>
                    Notice URL:
                    <input
                        type="text"
                        {...register("url", { required: "URL is required" })}
                    />
                    {errors.url && <p className={styles.error}>{errors.url.message}</p>}
                </label>
                <label>
                    Notice Name:
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </label>
                <label>
                    Send Body:
                    <select
                        {...register("sendbody", { required: "Please select an option" })}
                    >
                        <option value="">Select an option</option>
                        <option value="Primary School">Primary School</option>
                        <option value="Upper Primary School">Upper Primary School</option>
                        <option value="Both School">Both School</option>
                        <option value="Ashram">Ashram</option>
                        
                        <option value="Admission">Admission</option>
                        <option value="Technical">Technical</option>
                        
                    </select>
                    {errors.sendbody && <p className={styles.error}>{errors.sendbody.message}</p>}
                </label>

                <label>
                    Date:
                    <input
                        type="date"
                        {...register("date")}
                    />
                    {errors.date && <p className={styles.error}>{errors.date.message}</p>}
                </label>
                <button type="submit" className={styles.submitButton}>Create Notice</button>
            </form>

            <h2>Active Notices</h2>
            {notices.length > 0 ? (
                <table className={styles.noticeTable}>
                    <thead>
                        <tr>
                            <th>Notice Name</th>
                            <th>Send Body</th>
                            <th>Date</th>
                            <th>URL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice._id}>
                                <td>{notice.name}</td>
                                <td>{notice.sendbody}</td>
                                <td>{notice.date}</td>
                                <td><a href={notice.url} target="_blank" rel="noopener noreferrer">View</a></td>
                                <td>
                                    <button onClick={() => handleDelete(notice._id)} className={styles.deleteButton}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No active notices available.</p>
            )}
        </div>
    );
};

export default Notice;
