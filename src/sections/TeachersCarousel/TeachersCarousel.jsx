// TeacherCarousel.jsx
import React from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import teachers from '../../data/Teachers';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './styles/TeachersCarousel.css';

const TeachersCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true 
    };

  return (
    <div className="teacher-carousel">
      <h2>Know Your Teachers</h2>
      <Slider {...settings}>
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </Slider>
      <button className='btn'>Know Your Teachers</button>
    </div>
  );
};

export default TeachersCarousel;
