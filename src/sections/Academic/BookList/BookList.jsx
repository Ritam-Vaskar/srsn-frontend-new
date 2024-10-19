import React, { useState, useEffect } from 'react';
import BookListPrimary from './../../../../public/BookListPrimary.json';
import BookListSecondary from './../../../../public/BookListSecondary.json';
import CardComponent from './../../../components/ClassWiseCard/ClassWiseCard'

const BookList = ({ flag }) => {
    let currentYear = new Date().getFullYear()
    return (
        <div>
            <CardComponent titile1={`Book for the Academic Year ${currentYear}`} titile2="Book for " Prischool={BookListPrimary} SecSchool={BookListSecondary} flag={flag} />
        </div>
    );
};

export default BookList;




