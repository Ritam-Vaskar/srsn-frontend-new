import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import AlumniApplicationForm from '../../components/AlumniApplicationForm/AlumniApplicationForm';
import styles from './styles/Alumni.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResult from './../../sections/AlumniSearch/SearchDiv/SearchPage';
import Spinner from '../../layouts/Loader/Spinner';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const alumniPerPage = 12;

  // Fetch alumni data
  const fetchAlumniData = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(SummaryApi.AlumniFetch.url, {
        method: SummaryApi.AlumniFetch.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      setAlumniList(data.alumni || []); // Ensure data fallback
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch alumni data');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    setLoading(true);
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
        
        {/* Search Bar */}
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


        {/* Alumni Application Form Button or Spinner */}
       

        {/* Display SearchResult or Default Alumni List */}
        {loading ? (
          <Spinner />
        ) : search.length > 1 ? (
          <SearchResult search={search} />
        ) : (
          <>

          <center><button onClick={() => setShowApplicationForm(true)} className={styles.applyButton}>
              Apply for Alumni
            </button></center>
          <div className={styles.alumniGrid}>
            
            {currentAlumni.map((alumni, index) => (
              <AlumniCard key={index} alumni={alumni} />
            ))}
          </div>
          </>
        )}
      </div>

      {/* Pagination for Alumni List */}
      {!search.length && !loading && (
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
