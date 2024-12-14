import React, { useState, useEffect } from 'react';
import HolyTrio from '../../sections/HolyTrio/HolyTrio';
import Mission from '../../sections/MissionAndVision/MissionAndVission';
import SchoolMedia from '../../sections/SchoolMedia/Media';
import TeachersCarousel from '../../sections/TeachersCarousel/TeachersCarousel';
import HeroCarousel from '../../sections/HeroCarousel/HeroCarousel';
import Contact from '../../sections/Contact/Contact';
import { Link } from 'react-router-dom';
import SummaryApi from '../../common'; // Adjust the path as needed
import { toast } from 'react-toastify';
import styles from './styles/Home.module.scss'; // Import the SCSS module
import LiveEventPopup from '../../layouts/liveEvent/LiveEvent';

const Home = () => {
    
    return (
        <div>
            {/* Admission Status Popup */}
            <LiveEventPopup />

            <section id="hero-carousel">
                <HeroCarousel />
            </section>

            <section>
                <Link to="/school/academic#notice">
                    <button
                        style={{
                            backgroundColor: "var(--ashram-yellow)",
                            border: "none",
                            width: "100%",
                            margin: "10px 0",
                            padding: "10px 20px",
                            color: "white",
                            fontSize: "24px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        View School Notice Board
                    </button>
                </Link>
            </section>

            <section id="mission">
                <Mission />
            </section>

            <section id="holytrio">
                <HolyTrio />
            </section>

            <section id="school-media">
                <SchoolMedia />
            </section>

            <section id="teachers-carousel">
                <TeachersCarousel />
            </section>

            <section id="contact">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
