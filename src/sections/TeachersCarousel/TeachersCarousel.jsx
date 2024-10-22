import React from 'react';
import { useState, useEffect } from 'react';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './styles/TeachersCarousel.css';
import SummaryApi from '../../common';

const TeachersCarousel = () => {
    const [teachers, setTeachers] =useState([]);
    const fetchTeachers = async () => {
        try{
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
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 480, // for screens smaller than 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
