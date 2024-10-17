import React from "react";
import AboutCard from "../../components/AboutCard/AboutCard";
import aboutData from "../../data/About.json"; // Import the JSON data

const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <p>Information about the Ashram.</p>
            {/* Map over the aboutData array and render an AboutCard for each entry */}
            {aboutData.map((item, index) => (
                <AboutCard
                    key={index}
                    image={item.image}
                    description={item.description}
                />
            ))}
        </div>
    );
};

export default About;
