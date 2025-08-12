// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import bcrypt from 'bcryptjs';
// import { toast } from 'react-toastify';
// import styles from './Students.module.scss';
// import SummaryApi from './../../../../common/index';

// const Students = () => {
//     const user = useSelector(state => state?.user?.user);
//     const [password, setPassword] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalType, setModalType] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [events, setEvents] = useState([]);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [changeHistory, setChangeHistory] = useState([]);
//     const [isChangeHistoryModalOpen, setIsChangeHistoryModalOpen] = useState(false);

//     // Fetch events on component mount
//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         try {
//             const response = await fetch(SummaryApi.Eventfetch.url, {
//                 method: SummaryApi.Eventfetch.method,
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setEvents(data.events);
//             } else {
//                 toast.error('Failed to fetch events');
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const changeClass = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserChangeClass.url, {
//                 method: SummaryApi.UserChangeClass.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Class changed successfully!');
//             } else {
//                 toast.error('Failed to change class');
//             }
//         } catch (error) {
//             console.error('Error changing class:', error);
//         }
//     };

//     const calculateResult = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserGetResult.url, {
//                 method: SummaryApi.UserGetResult.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Result calculated successfully');
//             } else {
//                 toast.error('Failed to calculate result');
//             }
//         } catch (error) {
//             console.error('Error calculating result:', error);
//         }
//     };

//     // const handleOpenModal = (type, event = null) => {
//     //     setModalType(type);
//     //     setSelectedEvent(event);
//     //     setIsModalOpen(true);
//     //     setErrorMessage('');
//     // };

  
//     const handleOpenModal = (type, event = null) => {
//         setModalType(type);
//         setSelectedEvent(event);
//         setIsModalOpen(true);
//         setErrorMessage('');
//     };

//     const handlePasswordSubmit = async () => {
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (isPasswordCorrect) {
//             setIsModalOpen(false);
//             setPassword('');
//             if (modalType === 'changeClass') {
//                 await changeClass();
//             } else if (modalType === 'calculateResult') {
//                 await calculateResult();
//             } else if (modalType === 'toggleEventStatus' && selectedEvent) {
//                 await toggleEventStatus(selectedEvent);
//             }
//         } else {
//             setErrorMessage('Incorrect password, please try again.');
//         }
//     };

//     const toggleEventStatus = async (event) => {
//         try {
//             const response = await fetch(SummaryApi.EventToggle.url, {
//                 method: SummaryApi.EventToggle.method,
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ id: event._id }),
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Event status updated successfully!');
//                 fetchEvents(); // Refresh the events list
//             } else {
//                 toast.error('Failed to update event status');
//             }
//         } catch (error) {
//             console.error('Error updating event status:', error);
//         }
//     };

//     const handleViewChanges = (event) => {
//         setChangeHistory(event.changes);
//         setIsChangeHistoryModalOpen(true);
//     };

//     return (
//         <div className={styles.studentsContainer}>
//             <h2>Students Section</h2>
//             <p>This is the student setting option (please use it carefully)</p>


//             {/* Buttons for Change Class and Calculate Result */}
//             <button onClick={() => handleOpenModal('changeClass')}>Change Class</button>
//             <button onClick={() => handleOpenModal('calculateResult')}>Calculate Result</button>


//             {/* Events Table */}
//             <table className={styles.eventTable}>
//                 <thead>
//                     <tr>
//                         <th>Event Name</th>
//                         <th>Status</th>
//                         <th>Toggle Status</th>
//                         <th>View Changes</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {events.map(event => (
//                         <tr key={event._id}>
//                             <td>{event.name}</td>
//                             <td>{event.isOngoing ? 'Ongoing' : 'Not Ongoing'}</td>
//                             <td>
//                                 <button onClick={() => handleOpenModal('toggleEventStatus', event)}>
//                                     {event.isOngoing ? 'Turn Off' : 'Turn On'}
//                                 </button>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleViewChanges(event)}>View Changes</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Modal for Password Entry */}
//             {isModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <h3>Toggle Event Status</h3>
//                         <p>Please enter your password to proceed:</p>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter password"
//                         />
//                         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//                         <button onClick={handlePasswordSubmit}>Submit</button>
//                         <button onClick={() => setIsModalOpen(false)}>Cancel</button>
//                     </div>
//                 </div>
//             )}

//             {/* Change History Modal */}
//             {isChangeHistoryModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <h3>Event Change History</h3>
//                         <ul>
//                             {changeHistory.map((change, index) => (
//                                 <li key={index}>
//                                     <pre>{JSON.stringify(change, null, 2)}</pre>
//                                 </li>
//                             ))}
//                         </ul>
//                         <button onClick={() => setIsChangeHistoryModalOpen(false)}>Close</button>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Students;





import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import styles from './Students.module.scss';
import SummaryApi from './../../../../common/index';
import { makeAuthenticatedRequest } from '../../../../helper/tokenManager';

const Students = () => {
    const user = useSelector(state => state?.user?.user);
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isChangeHistoryModalOpen, setIsChangeHistoryModalOpen] = useState(false);
    const [changeHistory, setChangeHistory] = useState([]);

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.Eventfetch.url, {
                method: SummaryApi.Eventfetch.method
            });
            const data = await response.json();
            if (data.success) {
                setEvents(data.events);
            } else {
                toast.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const changeClass = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.UserChangeClass.url, {
                method: SummaryApi.UserChangeClass.method
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Class changed successfully!');
            } else {
                toast.error('Failed to change class');
            }
        } catch (error) {
            console.error('Error changing class:', error);
        }
    };

    const calculateBeezTo4 = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.UserGetResultPrimary.url, {
                method: SummaryApi.UserGetResultPrimary.method
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Beez to 4 Result calculated successfully');
            } else {
                toast.error('Failed to calculate Beez to 4 result');
            }
        } catch (error) {
            console.error('Error calculating Beez to 4 result:', error);
        }
    };

    const calculate5to8 = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.UserGetResultHigh.url, {
                method: SummaryApi.UserGetResultHigh.method
            });
            const data = await response.json();
            if (data.success) {
                toast.success('5 to 8 Result calculated successfully');
            } else {
                toast.error('Failed to calculate 5 to 8 result');
            }
        } catch (error) {
            console.error('Error calculating 5 to 8 result:', error);
        }
    };

    const handleOpenModal = (type, event = null) => {
        setModalType(type);
        setSelectedEvent(event);
        setIsModalOpen(true);
        setErrorMessage('');
    };

    const handlePasswordSubmit = async () => {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            setIsModalOpen(false);
            setPassword('');
            if (modalType === 'changeClass') {
                await changeClass();
            } else if (modalType === 'toggleEventStatus' && selectedEvent) {
                await toggleEventStatus(selectedEvent);
            }
        } else {
            setErrorMessage('Incorrect password, please try again.');
        }
    };

    const toggleEventStatus = async (event) => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.EventToggle.url, {
                method: SummaryApi.EventToggle.method,
                body: JSON.stringify({ id: event._id })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Event status updated successfully!');
                fetchEvents(); // Refresh the events list
            } else {
                toast.error('Failed to update event status');
            }
        } catch (error) {
            console.error('Error updating event status:', error);
        }
    };

    const handleViewChanges = (event) => {
        setChangeHistory(event.changes);
        setIsChangeHistoryModalOpen(true);
    };

    return (
        <div className={styles.studentsContainer}>
            <h2>Students Section</h2>
            <p>This is the student setting option (please use it carefully)</p>

            {/* Buttons for Change Class, Beezto4, and 5to8 */}
            <button onClick={() => handleOpenModal('changeClass')}>Change Class</button>
            <button onClick={calculateBeezTo4}>Calculate Beez to 4 Result</button>
            <button onClick={calculate5to8}>Calculate 5 to 8 Result</button>

            {/* Events Table */}
            <table className={styles.eventTable}>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Status</th>
                        <th>Toggle Status</th>
                        <th>View Changes</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.name}</td>
                            <td>{event.isOngoing ? 'Ongoing' : 'Not Ongoing'}</td>
                            <td>
                                <button onClick={() => handleOpenModal('toggleEventStatus', event)}>
                                    {event.isOngoing ? 'Turn Off' : 'Turn On'}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleViewChanges(event)}>View Changes</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Password Entry */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>{modalType === 'changeClass' ? 'Change Class' : 'Toggle Event Status'}</h3>
                        <p>Please enter your password to proceed:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button onClick={handlePasswordSubmit}>Submit</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Change History Modal */}
            {isChangeHistoryModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Event Change History</h3>
                        <ul>
                            {changeHistory.map((change, index) => (
                                <li key={index}>
                                    <pre>{JSON.stringify(change, null, 2)}</pre>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setIsChangeHistoryModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
