import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state?.user?.user);
    
    return (
        <div>
            <UserProfile user={user}/>
        </div>
    );
};

export default Profile;
