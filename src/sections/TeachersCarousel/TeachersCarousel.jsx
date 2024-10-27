// TeachersCarousel.jsx
import React, { useState, useEffect } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './styles/TeachersCarousel.css';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const customStyles = {
    card: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
    knowMoreButton: { 
        display: 'none' 
    },
    profilePic: {
      border: '1px solid ##dfdfdf4f',
      height: '200px',
      width: '200px',
      objectFit: 'cover',
    },
    name: {
      color: '#007bff',
    },
    button: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    modalBox: {
      padding: '30px',
      backgroundColor: '#f8f9fa',
    },
  };

const TeachersCarousel = () => {
    const [teachers, setTeachers] = useState([]);
    
    const fetchTeachers = async () => {
        try {
            const response = await fetch(SummaryApi.TeacherFetch.url, {
                method: SummaryApi.TeacherFetch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            setTeachers(result.teacher);
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };

    return (
        <div className="teacher-carousel">
            <h2>Know Your Teachers</h2>
            <Slider {...settings}>
                {teachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} customStyles={customStyles} />
                ))}
            </Slider>
            <button className='carousel-btn'>
                <Link to="/school/teacher" style={{color: 'white'}}>Know Your Teachers</Link>
            </button>
        </div>
    );
};

export default TeachersCarousel;
