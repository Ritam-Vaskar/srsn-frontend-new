import React from 'react';
import HolyTrio from '../../sections/HolyTrio/HolyTrio';
import Mission from '../../sections/MissionAndVision/MissionAndVission';
import SchoolMedia from '../../sections/SchoolMedia/Media';
import TeachersCarousel from '../../sections/TeachersCarousel/TeachersCarousel';

const Home = () => {
    return (
        <div>
            <section id="holytrio">
                <HolyTrio />
            </section>
            <section id="mission">
                <Mission />
            </section>
            <section id="school-media">
                <SchoolMedia />
            </section>
            <section id="teachers-carousel">
                <TeachersCarousel />
            </section>
        </div>
    );
};

export default Home;
