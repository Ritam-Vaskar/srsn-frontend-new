// Alumni.js
import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import AlumniApplicationForm from '../../components/AlumniApplicationForm/AlumniApplicationForm';
import styles from './styles/Alumni.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResult from './../../sections/AlumniSearch/SearchDiv/SearchPage';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const alumniPerPage = 12;

  // Fetch alumni data
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

  // Pagination logic
  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = alumniList.slice(indexOfFirstAlumni, indexOfLastAlumni);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  const totalPages = Math.ceil(alumniList.length / alumniPerPage);

  // Handler to clear the search input
  const clearSearch = () => setSearch('');

  return (
    <div className={styles.alumniPage}>
      <div className={styles.upperDiv}>
        <center><h1>Our Alumni</h1></center>
        <center>
          <div className={styles.alumniSearch}>
            <input 
              type="text" 
              placeholder="Search Alumni" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            {search ? (
              <CloseIcon onClick={clearSearch} className={styles.icon} />
            ) : (
              <SearchIcon className={styles.icon} />
            )}
          </div>
        </center>

        {/* Alumni Application Form */}
        <center>
          {!loading ? (
            <button onClick={() => setShowApplicationForm(true)} className={styles.applyButton}>
              Apply for Alumni
            </button>
          ) : (
            <p>Loading...</p> 
          )}
        </center>
        
        {/* Display SearchResult or Default Alumni List */}
        {search.length > 1 ? (
          <SearchResult search={search} />
        ) : (
          <div className={styles.alumniGrid}>
            {currentAlumni.map((alumni, index) => (
              <AlumniCard key={index} alumni={alumni} />
            ))}
          </div>
        )}
        
        
      </div>

      {/* Pagination for Alumni List */}
      {!search.length && (
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
      )}

      {/* Display Application Form as Modal */}
      {showApplicationForm && (
        <AlumniApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
};

export default Alumni;
