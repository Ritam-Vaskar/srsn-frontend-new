import React, { useState, useContext } from 'react';
import styles from './styles/UserProfile.module.scss';
import StudentDetails from './../StudentFetch/StudentFetch';
import ProfileEdit from '../TeacherProfileEdit/ProfileEdit';
import Context from '../../../Context';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../../common';



const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { fetchUser } = useContext(Context);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleLogout = async() => {
    try {
      const response = await fetch(SummaryApi.UserLogout.url, {
        method: SummaryApi.UserLogout.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (result.success) {
        dispatch(setUserDetails(null));
        navigate('/school');
        toast.success('Logged out successfully!');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(result.message);
    }
   
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <div className={styles.profileImage}>
          <img src={user.profilePic} alt="profile" className={styles.image} />
        </div>

        <div className={styles.name}>{user.name}</div>
        <p>{user.role === 'Teacher' ? 'Teacher' : user.role === 'Student' ? 'Student' : 'Admin'}</p>

        {user.role === 'Teacher' && (
          <>
            <div className={styles.editProfile} onClick={() => setFlag(true)}>Your Profile</div>
            <div className={styles.studentDetails} onClick={() => setFlag(false)}>Result Portal</div>
            <div className={styles.resultPortal} onClick={handleEditClick}>Student Details</div>
          </>
        )}
        {user.role === 'Student' && (
          <>
            <div className={styles.editProfile} onClick={() => setFlag(true)}>Your Profile</div>
            <div className={styles.resultPortal} onClick={handleEditClick}>Result Portal</div>
          </>
        )}
        {user.role === 'Admin' && (
          <>
            <div className={styles.editProfile} onClick={() => setFlag(true)}>Your Profile</div>
            <div className={styles.studentDetails} onClick={() => setFlag(false)}>Result Portal</div>
            <div className={styles.resultPortal} onClick={handleEditClick}>Student Details</div>
            <div className={styles.adminPortal} onClick={handleEditClick}>Admin Portal</div>
          </>
        )}
        <div className={styles.logoutButton} onClick={handleLogout}>Logout</div>
      </div>

      <div className={styles.rightBar}>
        {flag ? (
          <div className={styles.profileDetails}>
            <h2>Profile Details</h2>
            <table className={styles.profileTable}>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td>Date of Joining:</td>
                  <td>{user.DateOfJoining}</td>
                </tr>
                <tr>
                  <td>Qualification:</td>
                  <td>{user.Qualification}</td>
                </tr>
              </tbody>
            </table>
            <button className={styles.editButton} onClick={handleEditClick}>Edit Profile</button>
          </div>
        ) : (
          <StudentDetails />
        )}
      </div>

      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <ProfileEdit user={user} closeModal={closeModal} fetchUser={fetchUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;