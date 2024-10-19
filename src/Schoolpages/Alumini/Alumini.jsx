import React from "react";
import TeamCard from "../../components/ProfileCard/ProfileCard";
import "./styles/Alumni.css";

// Sample Data for demonstration
const alumniData = [
  {
    name: "John Doe",
    img: "https://example.com/profile1.jpg",
    linkedin: "john-doe-linkedin",
    github: "john-doe-github",
  },
  {
    name: "Jane Smith",
    img: "https://example.com/profile2.jpg",
    linkedin: "jane-smith-linkedin",
    github: "jane-smith-github",
  },
];

const TeamList = () => {
  // Rendering alumni cards dynamically
  return (
    <div className="teamList">
      {alumniData.map((member, index) => (
        <TeamCard
          key={index}
          member={member}
          blurhash="LEG8_%els7NgM{M{RiNI*0IVog%L"
        />
      ))}
    </div>
  );
};

export default TeamList;
