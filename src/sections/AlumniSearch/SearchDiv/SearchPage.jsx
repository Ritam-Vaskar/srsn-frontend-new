// SearchPage.js
import React, { useEffect, useState } from 'react';
import AlumniCard from '../../../components/AlumniProfileCard/ProfileCard';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import styles from './SearchPage.module.scss';

const SearchPage = ({ search }) => {
    const [searchList, setSearchList] = useState([]);

    const findSearch = async () => {
        try {
            const response = await fetch(SummaryApi.AlumniSearch.url, {
                method: SummaryApi.AlumniSearch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ search })
            });
            const data = await response.json();
            setSearchList(data.alumni);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        if (search.length > 0) {
            findSearch();
        }
    }, [search]);

    return (
        <div className={styles.searchResultsGrid}>
            {searchList.length > 0 ? (
                searchList.map((alumni, index) => (
                    <AlumniCard key={index} alumni={alumni} />
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchPage;
