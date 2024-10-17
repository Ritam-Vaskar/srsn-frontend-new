// import React from 'react';
// import styles from './styles/AboutCard.module.css';
// import Button from '../Core/Button';

// const AboutCard = ({ image, description }) => {
//   return (
//     <div className="about-card">
//       <div className="imgDiv">
//         {/* Directly use the image path as it is provided in your JSON */}
//         <img src={image} alt="About" className="about-card__image" />
//       </div>
//       <div className="content">
//         <p className="about-card__description">{description}</p>
//         <Button style={{ width: "15%" }}>Learn More</Button>
//       </div>
//     </div>
//   );
// };

// export default AboutCard;


import React from 'react';
import styles from './styles/AboutCard.module.css';
import Button from '../Core/Button';

const AboutCard = ({ image, description }) => {
  return (
    <div className={styles.aboutCard}>
      <div className={styles.imgDiv}>
        <img src={image} alt="About" className={styles.aboutCardImage} />
      </div>
      <div className={styles.content}>
        <p className={styles.aboutCardDescription}>{description}</p>
        <Button style={{ width: "15%" }}>Learn More</Button>
      </div>
    </div>
  );
};

export default AboutCard;
