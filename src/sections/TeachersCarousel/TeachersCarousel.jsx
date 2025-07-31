// TeachersCarousel.jsx
import React, { useState, useEffect } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from './styles/TeachersCarousel.module.css';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const customStyles = {
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 12px 40px rgba(255, 140, 25, 0.15)',
  },
  knowMoreButton: { 
    display: 'none' // Hide the know more button in carousel
  },
  profilePic: {
    border: '4px solid rgba(255, 140, 25, 0.3)',
    height: '160px',
    width: '160px',
    objectFit: 'cover',
  },
  name: {
    color: '#1f2937',
  },
  modalBox: {
    padding: '40px',
    backgroundColor: '#ffffff',
  },
};

const TeachersCarousel = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      
      // Use regular fetch since teacherFetch endpoint is now public
      const response = await fetch(SummaryApi.TeacherFetch.url, {
        method: SummaryApi.TeacherFetch.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setTeachers(result.teacher);
    } catch (err) {
      console.log('Teacher fetch error:', err);
      toast.error('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const settings = {
    dots: false, // Disable slick dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 2, 
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 1, 
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px'
        }
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 1, 
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0px'
        }
      }
    ]
  };

  // Custom dots component
  const CustomDots = () => {
    const totalSlides = Math.ceil(teachers.length / 4); // Assuming 3 slides per view on desktop
    
    return (
      <div className={styles.customDots}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`${styles.customDot} ${
              Math.floor(currentSlide / 4) === index ? styles.activeDot : ''
            }`}
            onClick={() => {
              const slider = document.querySelector('.slick-slider');
              if (slider && slider.slick) {
                slider.slick.slickGoTo(index * 3);
              }
            }}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.teacherCarousel}>
        <div className={styles.carouselHeader}>
          <h2 className={styles.sectionTitle}>Meet Our Educators</h2>
          <p className={styles.sectionSubtitle}>Dedicated professionals shaping young minds</p>
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading our amazing teachers...</p>
        </div>
      </div>
    );
  }

  // If no teachers (e.g., user not authenticated), show a simple message
  if (teachers.length === 0) {
    return (
      <div className={styles.teacherCarousel}>
        <div className={styles.carouselHeader}>
          <div className={styles.headerBadge}>
            <span>✨ Our Faculty</span>
          </div>
          <h2 className={styles.sectionTitle}>Meet Our Educators</h2>
          <p className={styles.sectionSubtitle}>
            Dedicated professionals shaping young minds with passion and expertise
          </p>
        </div>
        <div className={styles.carouselFooter}>
          <Link to="/login" className={styles.viewAllButton}>
            <span>Login to Meet Our Teachers</span>
            <svg className={styles.buttonArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teacherCarousel}>
      {/* Background decoration */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle} />
        <div className={styles.decorationCircle} />
      </div>
      
      <div className={styles.carouselHeader}>
        <div className={styles.headerBadge}>
          <span>✨ Our Faculty</span>
        </div>
        <h2 className={styles.sectionTitle}>Meet Our Educators</h2>
        <p className={styles.sectionSubtitle}>
          Dedicated professionals shaping young minds with passion and expertise
        </p>
      </div>
      
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {teachers.map((teacher, index) => (
            <div key={index} className={styles.slideWrapper}>
              <TeacherCard teacher={teacher} customStyles={customStyles} />
            </div>
          ))}
        </Slider>
        
        {/* Custom Dots */}
        <CustomDots />
      </div>
      
      <div className={styles.carouselFooter}>
        
        <Link to="/school/teacher" className={styles.viewAllButton}>
          <span>Meet All Our Teachers</span>
          <svg className={styles.buttonArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TeachersCarousel;