import React, { useState, useContext, useEffect } from 'react';
import styles from './styles/UserProfile.module.scss';
import StudentResult from './../StudentFetch/StudentFetch';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import StudentDetails from '../../Profile/StudentDetails/StudentDetails';  // Import StudentDetails here
import AdminPortal from '../Admin/AdminProfile';
import StudentResultPortal from '../StudentResultPortal/StudentResult';
import Context from '../../../Context';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../../common';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const alumni = useSelector(state => state?.alumni?.alumni);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { fetchUser } = useContext(Context);

  const [isResultActivePrimary, setIsResultActivePrimary] = useState(false);
  const [isResultActiveHigh, setIsResultActiveHigh] = useState(false);

  const fetchResultPortal = async () => {
    try {
      const response = await fetch(SummaryApi.MarksSubmissionFetch.url, {
        method: SummaryApi.MarksSubmissionFetch.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      console.log(result);
      console.log(result);
      if (result.success) {
        setIsResultActivePrimary(result.primary.isOngoing);
        setIsResultActiveHigh(result.high.isOngoing);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchResultPortal();
  }, []);

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
        localStorage.removeItem("fcm_token");
        localStorage.removeItem("fcm_user");
        localStorage.removeItem("fcm_role");
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
            <div className={styles.resultPortal}>
              <Link
                to="/school/alumni/chat"
                className={styles.chatLink}
                onClick={() => handleLeftBarOptionClick("AlumniChat")}
              >
                Go to Chat
              </Link>
            </div>
            {
              (alumni) && (
                <Link
                  to="/school/alumni/profile"
                  className={styles.resultPortal}
                  onClick={() => handleLeftBarOptionClick("AlumniProfile")}
                >
                  Switch to Alumni Profile
                </Link>
              )
            }

          </>
        )}
        {/* {user.role === 'Student' && (
          <>
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>
            {isResultActive && <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentResult")}>Result Portal</div>}
            {
              (alumni)&&<Link to="/school/alumni/profile" className={styles.resultPortal}>Switch to Alumni Profile</Link> 
            }
          </>
        )} */}

        {user.role === 'Student' && (
          <>
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>

            {/* Check if the student's grade is 'beez', 'ankur', 'kisholoy' or grades 1-4 */}
            {/(Beez|Ankur|Kisholoy|[1-4])/.test(user.grade) && isResultActivePrimary && (
              <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentResult")}>Result Portal</div>
            )}

            {/* Check if the student's grade is 5-8 */}
            {/^[5-8]$/.test(user.grade) && isResultActiveHigh && (
              <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentResult")}>Result Portal</div>
            )}

            {/* Link to alumni profile if alumni */}
            {alumni && (
              <Link to="/school/alumni/profile" className={styles.resultPortal}>Switch to Alumni Profile</Link>
            )}
          </>
        )}



        {user.role === 'Admin' && (
          <>
            <div className={styles.editProfile} onClick={() => handleLeftBarOptionClick("Profile")}>Your Profile</div>
            <div className={styles.studentDetails} onClick={() => handleLeftBarOptionClick("ResultPortal")}>Result Portal</div>
            <div className={styles.resultPortal} onClick={() => handleLeftBarOptionClick("StudentDetails")}>Student Details</div>
            <div className={styles.adminPortal} onClick={() => handleLeftBarOptionClick("AdminPortal")}>Admin Portal</div>
            <Link
              to="/school/alumni/chat"
              className={styles.adminPortal}
              onClick={() => handleLeftBarOptionClick("AlumniChat")}
            >
              Go to Chat
            </Link>
            {
              (alumni) && <Link to="/school/alumni/profile" className={styles.resultPortal}>Switch to Alumni Profile</Link>
            }
          </>
        )}
        <div className={styles.logoutButton} onClick={handleLogout}>Logout</div>
      </div>

      <div className={styles.rightBar}>
        {activeComponent === "Profile" && (
          <div className={styles.profileDetails}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Profile Details</h2>
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
                {user.DateOfJoining&&<tr>
                  <td>Date of Joining:</td>
                  <td>{user.DateOfJoining}</td>
                </tr>}
                {user.Qualification&&<tr>
                  <td>Qualification:</td>
                  <td>{user.Qualification}</td>
                </tr>}
                {
                  user.grade&&<tr>
                    <td>Class:</td>
                    <td>{user.grade}</td>
                  </tr>
                }
              </tbody>
            </table>
            <button className={styles.editButton} onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
        {activeComponent === 'StudentResult' && <StudentResultPortal />}
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
