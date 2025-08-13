import React from 'react';
import Slider from "react-slick";
import styles from './styles/HeroCarousel.module.scss'; // Import your custom styles

const HeroCarousel = () => {
  const images = [
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/68124b6c40177c9489653fa7_IMG-20250430-WA0005.jpg", 
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34e03c2b125c749e9c_28071260_1907983642553541_4952021693143437781_o.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd3407219700795ae005_49769298_2354597557892145_2033352142013595648_n.jpg",
    "https://res.cloudinary.com/dodpgohuc/image/upload/v1755058168/7c27f319-d2ae-419b-a9df-a719018e8fe7_na2kbw.jpg"
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
