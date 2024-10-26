import React from "react";
import "./styles/Home.css";
import HolyTrio from "../../sections/HolyTrio/HolyTrio";
import Notice from '../../sections/Notice/Notice';


const Home = () => {
    return (
        <div className="home-container">
            <HolyTrio />
            <Notice />
        </div>
    );
};

export default Home;
