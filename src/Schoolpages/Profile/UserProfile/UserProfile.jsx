import React from 'react'
import { useSelector } from 'react-redux';
import TeacherProfile from './../TeacherProfile/TeacherProfile';

const UserProfile = () => {
    const user = useSelector(state => state?.user?.user);
  return (
    <div>
      {
        user?.role === "Teacher" ? <TeacherProfile user={user}/> : <div>Profile</div>
      }
    </div>
  )
}

export default UserProfile
