import React from "react";
import "./styles/Home.css";
import HolyTrio from "../../sections/HolyTrio/HolyTrio";
import Sec1 from "../../sections/AshramSections/Sec1/Sec1";
import Sec2 from "../../sections/AshramSections/Sec2/Sec2";
import Sec3 from "../../sections/AshramSections/Sec3/Sec3";


const Home = () => {
    return (
        <div className="home-container">
            <HolyTrio />
            <Sec1 />
            <Sec2 />
            <Sec3/>
        </div>
    );
};

export default Home;
