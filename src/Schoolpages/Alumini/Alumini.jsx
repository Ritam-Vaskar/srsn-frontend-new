import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import AlumniManage from '../../components/AlumniApplicationForm/AlumniManage';
import AlumniSkeleton from '../../layouts/Skeletons/ProfileCard/ProfileCardSkeleton'; // Skeleton component for cards
import styles from './styles/Alumni.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResult from './../../sections/AlumniSearch/SearchDiv/SearchPage';
import Spinner from '../../layouts/Loader/Spinner'; // Spinner for full-page loading

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); // For initial page load spinner
  const [loadingCards, setLoadingCards] = useState(true); // For card skeleton loading

  const alumniPerPage = 12;

  // Fetch alumni data
  const fetchAlumniData = async () => {
    setLoadingCards(true); // Start card skeleton loader
    try {
      const response = await fetch(SummaryApi.AlumniFetch.url, {
        method: SummaryApi.AlumniFetch.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      setTimeout(() => {
        setAlumniList(data.alumni || []); // Ensure data fallback
        setLoadingCards(false); // Stop card skeleton loader
      }, 2000); // Ensure skeleton is visible for at least 2 seconds
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch alumni data');
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingPage(true); // Start full-page spinner
      await fetchAlumniData();
      setLoadingPage(false); // Stop full-page spinner
    };
    loadData();
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
      {loadingPage ? (
        // Show full-page spinner during initial page load
        <Spinner />
      ) : (
        <>
          <div className={styles.upperDiv}>
            <center>
              <h1>Our Alumni</h1>
            </center>

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

            {/* Alumni Application Form Button */}
            {!loadingCards && (
              <center>
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className={styles.applyButton}
                >
                  Alumni Application and Login
                </button>
              </center>
            )}

            {/* Display SearchResult or Alumni List */}
            {search.length > 1 ? (
              <SearchResult search={search} />
            ) : (
              <div className={styles.alumniGrid}>
                {loadingCards ? (
                  // Display skeleton loaders during card loading
                  Array.from({ length: alumniPerPage }).map((_, index) => (
                    <AlumniSkeleton key={index} />
                  ))
                ) : (
                  currentAlumni.map((alumni, index) => (
                    <AlumniCard key={index} alumni={alumni} />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Pagination for Alumni List */}
          {!search.length && !loadingCards && (
            <div className={styles.pagination}>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => paginate(page + 1)}
                  className={
                    currentPage === page + 1 ? styles.activePage : ''
                  }
                >
                  {page + 1}
                </button>
              ))}
            </div>
          )}

          {/* Display Application Form as Modal */}
          {showApplicationForm && (
            <AlumniManage onClose={() => setShowApplicationForm(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default Alumni;
