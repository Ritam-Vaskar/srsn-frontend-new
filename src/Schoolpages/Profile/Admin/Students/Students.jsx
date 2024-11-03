// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import bcrypt from 'bcryptjs';
// import styles from './Students.module.scss';
// import SummaryApi from './../../../../common/index';
// import { toast } from 'react-toastify';

// const Students = () => {
//     const user = useSelector(state => state?.user?.user);
//     const [password, setPassword] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalType, setModalType] = useState(''); 
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleOpenModal = (type) => {
//         setModalType(type);
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
//             }
//         } else {
//             setErrorMessage('Incorrect password, please try again.');
//         }
//     };

//     const changeClass = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserChangeClass.url, {
//                 method: SummaryApi.UserChangeClass.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             console.log(data);
//             if (data.success) {
//                 toast.success('Change  class successfully!');
//             } else {
//                 toast.error('Failed to change class');
//             }
//         } catch (error) {
//             alert('Error changing class');
//             console.log(error);
//         }
//     };

//     const calculateResult = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserGetResult.url, {
//                 method: SummaryApi.UserGetResult.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Result calculated successfully');
//             } else {
//                 toast.error('Failed to calculate result');
//             }
//         } catch (error) {
//             alert('Error calculating result');
//             console.log(error);
//         }
//     };

//     return (
//         <div className={styles.studentsContainer}>
//             <h2>Students Section</h2>
//             <p>This is the student setting option (please use it carefully)</p>

//             <button onClick={() => handleOpenModal('changeClass')}>Student Change Class</button>
//             <button onClick={() => handleOpenModal('calculateResult')}>Student Result Calculate</button>


//             {isModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <h3>{modalType === 'changeClass' ? 'Change Class' : 'Calculate Result'}</h3>
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
//         </div>
//     );
// };

// export default Students;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import { Switch } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Students.module.scss';
import SummaryApi from './../../../../common/index';

const Students = () => {
    const user = useSelector(state => state?.user?.user);
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch(SummaryApi.Eventfetch.url, {
                method: SummaryApi.Eventfetch.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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
            } else if (modalType === 'calculateResult') {
                await calculateResult();
            } else if (modalType === 'toggleEventStatus' && selectedEvent) {
                await toggleEventStatus(selectedEvent);
            }
        } else {
            setErrorMessage('Incorrect password, please try again.');
        }
    };

    const changeClass = async () => {
        try {
            const response = await fetch(SummaryApi.UserChangeClass.url, {
                method: SummaryApi.UserChangeClass.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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

    const calculateResult = async () => {
        try {
            const response = await fetch(SummaryApi.UserGetResult.url, {
                method: SummaryApi.UserGetResult.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Result calculated successfully');
            } else {
                toast.error('Failed to calculate result');
            }
        } catch (error) {
            console.error('Error calculating result:', error);
        }
    };

    const toggleEventStatus = async (event) => {
        try {
            const response = await fetch(SummaryApi.EventToggle.url, {
                method: SummaryApi.EventToggle.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: event._id }),
                credentials: 'include',
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

    return (
        <div className={styles.studentsContainer}>
            <h2>Students Section</h2>
            <p>This is the student setting option (please use it carefully)</p>

            {/* Buttons for Change Class and Calculate Result */}
            <button onClick={() => handleOpenModal('changeClass')}>Change Class</button>
            <button onClick={() => handleOpenModal('calculateResult')}>Calculate Result</button>

            {/* Events Table */}
            <table className={styles.eventTable}>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Status</th>
                        <th>Toggle Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.isOngoing ? 'Ongoing' : 'Not Ongoing'}</td>
                            <td>
                                <button onClick={() => handleOpenModal('toggleEventStatus', event)}>
                                    {event.isOngoing ? 'Turn Off' : 'Turn On'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Password Entry */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>{modalType === 'changeClass' ? 'Change Class' : modalType === 'calculateResult' ? 'Calculate Result' : 'Toggle Event Status'}</h3>
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
        </div>
    );
};

export default Students;
