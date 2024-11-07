// pages/Alumni.js
import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import AlumniApplicationForm from '../../components/AlumniApplicationForm/AlumniApplicationForm';
import styles from './styles/Alumni.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import SearchResult from './../../sections/AlumniSearch/SearchDiv/SearchPage';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const alumniPerPage = 6;

  const fetchAlumniData = async () => {
    try {
      const response = await fetch(SummaryApi.AlumniFetch.url, {
        method: SummaryApi.AlumniFetch.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      setAlumniList(data.alumni);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchAlumniData();
  }, []);

  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = alumniList.slice(indexOfFirstAlumni, indexOfLastAlumni);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(alumniList.length / alumniPerPage);

  return (
    <div className={styles.alumniPage}>
      <div className={styles.upperDiv}>
        <h2>Our Alumni</h2>
        <center>
          <div className={styles.alumniSearch}>
            <input type="text" placeholder="Search Alumni" onChange={(e) => setSearch(e.target.value)} />
            <SearchIcon />
          </div>
        </center>
        {search.length > 1 && <SearchResult search={search} />}
        <center>
          {!loading ? (
            <button onClick={() => setShowApplicationForm(true)} className={styles.applyButton}>
              Apply for Alumni
            </button>
          ) : (
            <p>Loading...</p> 
          )}
        </center>
      </div>

      <div className={styles.alumniGrid}>
        {currentAlumni.map((alumni, index) => (
          <AlumniCard key={index} alumni={alumni} />
        ))}
      </div>

      <div className={styles.pagination}>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={currentPage === page + 1 ? styles.activePage : ''}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {showApplicationForm && <AlumniApplicationForm onClose={() => setShowApplicationForm(false)} />}
    </div>
  );
};

export default Alumni;
