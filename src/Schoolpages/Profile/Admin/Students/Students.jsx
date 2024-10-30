// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import bcrypt from 'bcryptjs';
// import styles from './Students.module.scss';
// import SummaryApi from '../../../../common';

// const Students = () => {
//     const user = useSelector(state => state?.user?.user);
//     const [password, setPassword] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalType, setModalType] = useState(''); // 'changeClass' or 'calculateResult'
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleOpenModal = (type) => {
//         setModalType(type);
//         setIsModalOpen(true);
//         setErrorMessage('');
//     };x

//     const handlePasswordSubmit = async () => {
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (isPasswordCorrect) {
//             setIsModalOpen(false);
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
//             const response = await fetch(SummaryApi.UserChangeClass.url,{
//                 method: SummaryApi.UserChangeClass.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials:'true'
//             })
//             const data = await response.json();
//             if (data.success) {
//                 alert('Class changed successfully');
//             } else {
//                 alert('Failed to change class');
//             }
//         } catch (error) {
//             alert('Error changing class');
//         }
//     };

//     const calculateResult = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserGetResult.url,{
//                 method: SummaryApi.UserGetResult.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials:'true'
//             })
//             const data = await response.json();
//             if (data.success) {
//                 alert('Result calculated successfully');
//             } else {
//                 alert('Failed to calculate result');
//             }
//         } catch (error) {
//             alert('Error calculating result');
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

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import styles from './Students.module.scss';
import SummaryApi from './../../../../common/index';
import { toast } from 'react-toastify';

const Students = () => {
    const user = useSelector(state => state?.user?.user);
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
        setErrorMessage('');
    };

    const handlePasswordSubmit = async () => {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            setIsModalOpen(false);
            if (modalType === 'changeClass') {
                await changeClass();
            } else if (modalType === 'calculateResult') {
                await calculateResult();
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
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast.success('Change  class successfully!');
            } else {
                toast.error('Failed to change class');
            }
        } catch (error) {
            alert('Error changing class');
            console.log(error);
        }
    };

    const calculateResult = async () => {
        try {
            const response = await fetch(SummaryApi.UserGetResult.url, {
                method: SummaryApi.UserGetResult.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Result calculated successfully');
            } else {
                toast.error('Failed to calculate result');
            }
        } catch (error) {
            alert('Error calculating result');
            console.log(error);
        }
    };

    return (
        <div className={styles.studentsContainer}>
            <h2>Students Section</h2>
            <p>This is the student setting option (please use it carefully)</p>

            <button onClick={() => handleOpenModal('changeClass')}>Student Change Class</button>
            <button onClick={() => handleOpenModal('calculateResult')}>Student Result Calculate</button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>{modalType === 'changeClass' ? 'Change Class' : 'Calculate Result'}</h3>
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



// import React from 'react';
// import styles from './Students.module.scss';

// const Students = () => {

//     const changeClass = async () => {
//         try {
//             const response = await fetch(SummaryApi.UserChangeClass.url, {
//                 method: SummaryApi.UserChangeClass.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'true'
//             });
//             const data = await response.json();
//             console.log(data);
//             if (data.success) {
//                 alert('Class changed successfully');
//             } else {
//                 alert('Failed to change class');
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
//                 credentials: 'true'
//             });
//             const data = await response.json();
//             if (data.success) {
//                 alert('Result calculated successfully');
//             } else {
//                 alert('Failed to calculate result');
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

//             <button onClick={changeClass}>Student Change Class</button>
//             <button onClick={calculateResult}>Student Result Calculate</button>
//         </div>
//     );
// };

// export default Students;
