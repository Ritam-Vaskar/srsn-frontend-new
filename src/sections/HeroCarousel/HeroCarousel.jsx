import React from 'react';
import Slider from "react-slick";
import styles from './styles/HeroCarousel.module.scss'; // Import your custom styles

const HeroCarousel = () => {
  const images = [
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/68124b6c40177c9489653fa7_IMG-20250430-WA0005.jpg", 
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34e03c2b125c749e9c_28071260_1907983642553541_4952021693143437781_o.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd3407219700795ae005_49769298_2354597557892145_2033352142013595648_n.jpg",
    // "https://res.cloudinary.com/dodpgohuc/image/upload/v1755058168/7c27f319-d2ae-419b-a9df-a719018e8fe7_na2kbw.jpg",
    "https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-6/630987831_1424769946105723_4906924420555463054_n.jpg?stp=dst-jpg_p843x403_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d810dS2_ou4Q7kNvwEoq-qU&_nc_oc=Adkvih0CL1AshunSgTQruUUBxVh30cmmKfNTztK_rvdrAO5RRf35P_nK6vqC0bdwbCXW4yZKs4hTsvc-v5xbpVuf&_nc_zt=23&_nc_ht=scontent-sin6-3.xx&_nc_gid=wOXX-OPvtGJMYFD2YwNRaw&oh=00_AftIl6ezCsXjAHIEuMSkBMkbgPpNxSijofbWjMIuOnsE1g&oe=6992A1B7",
    "https://scontent-sin11-2.xx.fbcdn.net/v/t39.30808-6/632832861_1424770046105713_32364821333612849_n.jpg?stp=dst-jpg_p640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=on9aRZXb12cQ7kNvwG2wFRX&_nc_oc=Adls5_vmXEZIVQw8RxULJTqXoVj-7b5-1czuBc8Gtnd33VunZjFZ9w1b2U51-dTq8VT5EQMfR_8OsPDGlltkZS_1&_nc_zt=23&_nc_ht=scontent-sin11-2.xx&_nc_gid=wOXX-OPvtGJMYFD2YwNRaw&oh=00_AfuGERKWNd3ldUU6BVL8S1llkpkqrE76swr57EJVo64vQg&oe=6992A40D",
    "https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/631274626_1424770016105716_1435195620103583008_n.jpg?stp=dst-jpg_p640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ttuJM2p6l7YQ7kNvwGnyHEp&_nc_oc=AdmhCnTpJuvm-Qodn1NWst7hC06I2Xc1FGth3byQUTf6MgoPCWK-ebXKwxRqqqTm-ImuBbrWm8wVYaOxQy271up9&_nc_zt=23&_nc_ht=scontent-sin6-2.xx&_nc_gid=wOXX-OPvtGJMYFD2YwNRaw&oh=00_Afs0QGcX8mQgJ7aShxyAPIh4wwGeZB7apsvTfw69q5Z8nw&oe=69927E32"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: true,
    arrows: false // Hide next/previous buttons for a cleaner look
  };

  return (
    <section className={styles.heroSection}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.heroSlide}>
            <img src={image} alt={`Slide ${index + 1}`} className={styles.heroImage} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroCarousel;
