// Notice.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Notice.module.scss';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState({
        url: '',
        name: '',
        sendbody: '',
        date: ''
    });

    useEffect(() => {
        fetchActiveNotices();
    }, []);

    const fetchActiveNotices = async () => {
        // Replace with API call to fetch active notices
        try {
            const response = await fetch('https://example.com/active-notices');
            const data = await response.json();
            if (data.success) {
                setNotices(data.notices);
            } else {
                toast.error("Failed to fetch active notices.");
            }
        } catch (error) {
            toast.error("Error fetching notices.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNotice({ ...newNotice, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with the API call to create a new notice
        try {
            const response = await fetch('https://example.com/create-notice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotice)
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Notice created successfully!");
                setNotices([...notices, result.notice]); // Add new notice to the list
                setNewNotice({ url: '', name: '', sendbody: '', date: '' }); // Reset form
            } else {
                toast.error("Failed to create notice.");
            }
        } catch (error) {
            toast.error("Error creating notice.");
        }
    };

    const handleDelete = async (noticeId) => {
        // Replace with API call to delete the notice
        try {
            const response = await fetch(`https://example.com/delete-notice/${noticeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Notice deleted successfully!");
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
            <form onSubmit={handleSubmit} className={styles.noticeForm}>
                <label>
                    Notice URL:
                    <input
                        type="text"
                        name="url"
                        value={newNotice.url}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Notice Name:
                    <input
                        type="text"
                        name="name"
                        value={newNotice.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Send Body:
                    <input
                        type="text"
                        name="sendbody"
                        value={newNotice.sendbody}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={newNotice.date}
                        onChange={handleInputChange}
                        required
                    />
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
                            <tr key={notice.id}>
                                <td>{notice.name}</td>
                                <td>{notice.sendbody}</td>
                                <td>{notice.date}</td>
                                <td><a href={notice.url} target="_blank" rel="noopener noreferrer">View</a></td>
                                <td>
                                    <button onClick={() => handleDelete(notice.id)} className={styles.deleteButton}>Delete</button>
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
