import React, { useState, useEffect } from 'react';
import SyllabusPrimary from './../../../../public/SyllabusPrimaryAdmission.json';
import SyllabusSecondary from './../../../../public/SyllabusSecondaryAdmission.json';
import CardComponent from './../../../components/ClassWiseCard/ClassWiseCard'


const Syllabus = ({ flag }) => {
    let currentYear = new Date().getFullYear()
    return (
        <div>
            <CardComponent titile1={`Syllabus for the Admission Year ${currentYear}`} titile2="Syllabus of " Prischool={SyllabusPrimary} SecSchool={SyllabusSecondary} flag={flag} isDoc={true}/>
        </div>
    );
};

export default Syllabus;
