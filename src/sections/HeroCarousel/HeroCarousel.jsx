import React from 'react';
import Slider from "react-slick";
import styles from './styles/HeroCarousel.module.scss'; // Import your custom styles

const HeroCarousel = () => {
  const images = [
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/679dead913371e4a4ee6c86a_WhatsApp%20Image%202025-01-31%20at%2021.37.18_3bbfb479.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34e03c2b125c749e9c_28071260_1907983642553541_4952021693143437781_o.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg",
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd3407219700795ae005_49769298_2354597557892145_2033352142013595648_n.jpg"
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
