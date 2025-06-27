import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Notice.module.scss";
import SummaryApi from '../../../common';
import { toast } from "react-toastify";
import Spinner from "../../../layouts/Loader/Spinner";

const Noticebar = () => {
  const [notice, setNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const noticesPerPage = 5;
  const Noticeref = useRef(null);

  const getNotice = async () => {
    try {
      const response = await fetch(SummaryApi.NoticeFetch.url, {
        method: SummaryApi.NoticeFetch.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "API response unsuccessful.");
      }

      const data = result.notice;
      if (data && Array.isArray(data) && data.length > 0) {
        const notices = data.filter((notice) => (notice.sendbody !== "Technical" && notice.sendbody !== "Admission"));
        const lastFiftyNotices = notices.slice(-50).reverse();
        setNotice(lastFiftyNotices);
        setTotalPages(Math.ceil(lastFiftyNotices.length / noticesPerPage));
      } else {
        setNotice([]);
        throw new Error("No notices found.");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching notices: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  const paginatedNotices = useCallback(() => {
    const startIndex = (currentPage - 1) * noticesPerPage;
    return notice.slice(startIndex, startIndex + noticesPerPage);
  }, [currentPage, notice]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <Spinner />
    </div>
  );

  if (error) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Unable to Load Notices</h3>
        <p>{error}</p>
        <button onClick={getNotice} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    </div>
  );

  const currentNotices = paginatedNotices();

  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <div className={styles.noticeIcon}>📢</div>
          </div>
          <div className={styles.titleSection}>
            <h2 ref={Noticeref} className={styles.noticeTitle}>
              Notice Board
            </h2>
            <div className={styles.titleUnderline}></div>
          </div>
        </div>
        <div className={styles.headerDecoration}></div>
      </div>

      <div className={styles.noticeContent}>
        {currentNotices.length ? (
          <div className={styles.noticeList}>
            {currentNotices.map((item, index) => (
              <div 
                className={styles.noticeCard} 
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.noticeMain}>
                    <div className={styles.noticeInfo}>
                      <a 
                        href={item.url} 
                        className={styles.noticeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={item.name || "Untitled"}
                      >
                        <h4 className={styles.noticeTitle}>
                          {item.name || "Untitled"}
                        </h4>
                      </a>
                      <div className={styles.noticeMeta}>
                        <span className={styles.sendBody}>
                          <span className={styles.metaIcon}>🏢</span>
                          {item.sendbody || "General"}
                        </span>
                        <span className={styles.date}>
                          <span className={styles.metaIcon}>📅</span>
                          {formatDate(item.date) || "No date"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.actionIcon}>
                      <span className={styles.externalLink}>🔗</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>No Notices Available</h3>
            <p>Check back later for updates</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.paginationBtn} ${styles.prevBtn}`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <span className={styles.btnIcon}>←</span>
            <span className={styles.btnText}>Previous</span>
          </button>
          
          <div className={styles.pageInfo}>
            <span className={styles.pageNumbers}>
              <span className={styles.currentPage}>{currentPage}</span>
              <span className={styles.pageSeparator}>of</span>
              <span className={styles.totalPages}>{totalPages}</span>
            </span>
          </div>
          
          <button
            className={`${styles.paginationBtn} ${styles.nextBtn}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <span className={styles.btnText}>Next</span>
            <span className={styles.btnIcon}>→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Noticebar;