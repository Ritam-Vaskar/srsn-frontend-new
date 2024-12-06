

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

      // Log the entire result to see if it contains the expected data
      console.log("API Response:", result);

      if (!result.success) {
        throw new Error(result.message || "API response unsuccessful.");
      }

      const data = result.notice;
      if (data && Array.isArray(data) && data.length > 0) {
        const lastFiftyNotices = data.slice(-50).reverse();
        setNotice(lastFiftyNotices);
        setTotalPages(Math.ceil(lastFiftyNotices.length / noticesPerPage));
      } else {
        setNotice([]); // Set an empty notice if no data found
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

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  const currentNotices = paginatedNotices();

  return (
    <div className={styles.notice}>
      <div className={styles.notice_div}>
        <h3 ref={Noticeref} className={styles.notice_title}>
          Notice Board
        </h3>

        {currentNotices.length ? (
          currentNotices.map((item, index) => (
            <div className={styles.notice_card} key={index}>
              <div className={styles.notice_card_upper}>
                <a href={item.url} className={styles.notice_link} target="_blank" rel="noopener noreferrer">
                  {item.name || "Untitled"}
                </a>
                <p className={styles.sendBody}>{item.sendbody || "No description available"}</p>
              </div>
              
              <p className={styles.date}>{item.date.substring(0,10) || "No date provided"}</p>
            </div>
          ))
        ) : (
          <p>No notices available.</p>
        )}
      </div>
      <div className={styles.page_controls}>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Noticebar;
