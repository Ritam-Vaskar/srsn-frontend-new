import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Blurhash } from "react-blurhash";
import "./styles/ProfileCard.css";  

const TeamCard = ({ member, blurhash }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleLink = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    } else {
      return "https://" + url;
    }
  };

  return (
    <div className="teamMember">
      <div className="teamMemberInner">
        <div className="teamMemberFront">
          <div className="ImgDiv">
            {!isImageLoaded && (
              <Blurhash
                hash={blurhash || "LEG8_%els7NgM{M{RiNI*0IVog%L"}
                width={"100%"}
                height={"100%"}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="teamMember_blurhash"
              />
            )}
            <img
              src={member?.img}
              alt={`Profile of ${member?.name}`}
              className="teamMemberImg"
              onLoad={handleImageLoad}
              style={{ display: isImageLoaded ? "block" : "none" }}
            />
          </div>
          <div className="teamMemberInfo">
            <h4 className="memName">{member?.name}</h4>
          </div>
        </div>
        <div className="socialLinks">
          {member?.linkedin && (
            <a
              href={handleLink(member?.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="socialLinksa"
            >
              <FaLinkedin />
            </a>
          )}
          {member?.github && (
            <a
              href={handleLink(member?.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="socialLinksa"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
