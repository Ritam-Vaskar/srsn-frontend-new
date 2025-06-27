import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import AlumniManage from '../../components/AlumniApplicationForm/AlumniManage';
import AlumniSkeleton from '../../layouts/Skeletons/ProfileCard/ProfileCardSkeleton';
import styles from './styles/Alumni.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchResult from './../../sections/AlumniSearch/SearchDiv/SearchPage';
import Spinner from '../../layouts/Loader/Spinner';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterYear, setFilterYear] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const alumniPerPage = 12;

  // Fetch alumni data
  const fetchAlumniData = async () => {
    setLoadingCards(true);
    try {
      const response = await fetch(SummaryApi.AlumniFetch.url, {
        method: SummaryApi.AlumniFetch.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      setTimeout(() => {
        setAlumniList(data.alumni || []);
        setLoadingCards(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch alumni data');
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingPage(true);
      await fetchAlumniData();
      setLoadingPage(false);
    };
    loadData();
  }, []);

  // Filter alumni by year
  const filteredAlumni = alumniList.filter(alumni => {
    if (!filterYear) return true;
    return alumni.startingYear.toString().includes(filterYear) || 
           alumni.endingYear.toString().includes(filterYear);
  });

  // Pagination logic
  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumni, indexOfLastAlumni);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);

  // Handler to clear the search input
  const clearSearch = () => setSearch('');

  // Get unique graduation years for filter
  const getGraduationYears = () => {
    const years = new Set();
    alumniList.forEach(alumni => {
      years.add(alumni.endingYear);
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  return (
    <div className={styles.alumniPage}>
      {loadingPage ? (
        <Spinner />
      ) : (
        <>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Our Distinguished Alumni</h1>
              <p className={styles.heroSubtitle}>
                Connecting generations of excellence and inspiring future leaders
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{alumniList.length}+</span>
                  <span className={styles.statLabel}>Alumni</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{getGraduationYears().length}</span>
                  <span className={styles.statLabel}>Passing Classes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className={styles.controlPanel}>
            <div className={styles.searchSection}>
              <div className={styles.alumniSearch}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search alumni by name, designation, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <CloseIcon onClick={clearSearch} className={styles.clearIcon} />
                )}
              </div>
            </div>

            <div className={styles.controlsRight}>
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
              >
                <FilterListIcon />
                Filters
              </button>

              {/* View Mode Toggle */}
              <div className={styles.viewToggle}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? styles.active : ''}
                >
                  <GridViewIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? styles.active : ''}
                >
                  <ViewListIcon />
                </button>
              </div>

              {/* Alumni Application Button */}
              {!loadingCards && (
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className={styles.applyButton}
                >
                  Join Our Network
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterGroup}>
                <label>Passing Year:</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="">All Years</option>
                  {getGraduationYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {filterYear && (
                <button
                  onClick={() => setFilterYear('')}
                  className={styles.clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Results Info */}
          {!search.length && !loadingCards && (
            <div className={styles.resultsInfo}>
              <p>
                Showing {currentAlumni.length} of {filteredAlumni.length} alumni
                {filterYear && ` (Class of ${filterYear})`}
              </p>
            </div>
          )}

          {/* Alumni Grid/List */}
          {search.length > 1 ? (
            <SearchResult search={search} />
          ) : (
            <div className={`${styles.alumniContainer} ${styles[viewMode]}`}>
              {loadingCards ? (
                Array.from({ length: alumniPerPage }).map((_, index) => (
                  <AlumniSkeleton key={index} />
                ))
              ) : (
                currentAlumni.map((alumni, index) => (
                  <AlumniCard key={index} alumni={alumni} viewMode={viewMode} />
                ))
              )}
            </div>
          )}

          {/* Enhanced Pagination */}
          {!search.length && !loadingCards && totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={styles.paginationArrow}
                >
                  ← Previous
                </button>
                
                {[...Array(totalPages).keys()].map((page) => {
                  const pageNumber = page + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={currentPage === pageNumber ? styles.activePage : ''}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className={styles.ellipsis}>...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={styles.paginationArrow}
                >
                  Next →
                </button>
              </div>
              
              <div className={styles.paginationInfo}>
                Page {currentPage} of {totalPages}
              </div>
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