import React from "react";
import AboutCard from "../../components/AboutCard/AboutCard";
import aboutData from "../../data/About.json"; // Import the JSON data
import IdealsAndIdeologySection from "../../sections/AshramSections/Sec4/Sec4";


const About = () => {
    return (
        <div>
            <center style={{marginTop:'30px'}}><h1>About Us</h1>
            <p>Information about the Ashram.</p></center>
            {/* Map over the aboutData array and render an AboutCard for each entry */}
            {aboutData.map((item, index) => (
                <AboutCard
                    key={index}
                    image={item.image}
                    description={item.description}
                />
            ))}
            <IdealsAndIdeologySection />
        </div>
    );
};

export default About;
