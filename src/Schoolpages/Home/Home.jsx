// Home.jsx
import React from 'react';
import HolyTrio from '../../sections/HolyTrio/HolyTrio';
import Mission from '../../sections/MissionAndVision/MissionAndVission';
import SchoolMedia from '../../sections/SchoolMedia/Media';
import TeachersCarousel from '../../sections/TeachersCarousel/TeachersCarousel';

const Home = () => {
    return (
        <div>
            <HolyTrio />
            <Mission />
            <SchoolMedia />
            <TeachersCarousel />
            
        </div>
    );
};

export default Home;
