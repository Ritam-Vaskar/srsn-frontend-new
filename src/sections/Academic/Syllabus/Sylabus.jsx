import React, { useState, useEffect } from 'react';
import SyllabusPrimary from './../../../../public/SyllabusPrimary.json';
import SyllabusSecondary from './../../../../public/SyllabusSecondary.json';
import CardComponent from './../../../components/ClassWiseCard/ClassWiseCard'
const Syllabus = ({ flag }) => {
    let currentYear = new Date().getFullYear()
    return (
        <div>
            <CardComponent titile1={`Syllabus for the Academic Year ${currentYear}`} titile2="Syllabus of " Prischool={SyllabusPrimary} SecSchool={SyllabusSecondary} flag={flag} />
        </div>
    );
};

export default Syllabus;
