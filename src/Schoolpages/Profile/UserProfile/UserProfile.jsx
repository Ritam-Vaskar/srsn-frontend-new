import React, { useState, useContext } from 'react';
import styles from './styles/UserProfile.module.scss';
import StudentResult from './../StudentFetch/StudentFetch';
import ProfileEdit from '../TeacherProfileEdit/ProfileEdit';
import StudentDetails from '../../Profile/StudentDetails/StudentDetails';  // Import StudentDetails here
import AdminPortal from '../Admin/AdminProfile';
import Context from '../../../Context';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../../common';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { fetchUser } = useContext(Context);

  const handleEditClick = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeftBarOptionClick = (option) => {
    scrollToTop();
    setActiveComponent(option);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.UserLogout.url, {
        method: SummaryApi.UserLogout.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
      toast.error(error.message);
    }
  };

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
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>
            <div className={styles.studentDetails} onClick={() => handleLeftBarOptionClick("ResultPortal")}>Result Portal</div>
            <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentDetails")}>Student Details</div>
          </>
        )}
        {user.role === 'Student' && (
          <>
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>
            <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("ResultPortal")}>Result Portal</div>
          </>
        )}
        {user.role === 'Admin' && (
          <>
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>
            <div className={styles.studentDetails} onClick={() => handleLeftBarOptionClick("ResultPortal")}>Result Portal</div>
            <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentDetails")}>Student Details</div>
            <div className={styles.adminPortal} onClick={() => handleLeftBarOptionClick("AdminPortal")}>Admin Portal</div>
          </>
        )}
        <div className={styles.logoutButton} onClick={handleLogout}>Logout</div>
      </div>

      <div className={styles.rightBar}>
        {activeComponent === "Profile" && (
          <div className={styles.profileDetails}>
            <h2 style={{ textAlign: "center" , marginBottom: "20px" }}>Profile Details</h2>
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
        )}
        {activeComponent === "ResultPortal" && <StudentResult />}
        {activeComponent === "StudentDetails" && <StudentDetails />}
        {activeComponent === "AdminPortal" && <AdminPortal />}
      </div>

      {/* Profile Edit Modal */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <ProfileEdit user={user} closeModal={closeEditModal} fetchUser={fetchUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
