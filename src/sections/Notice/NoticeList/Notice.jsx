import React, { useEffect, useState, useRef } from "react";
import styles from "./Notice.module.scss";
import NewsData from '../../../../public/NewsData.json';

const Noticebar = () => {
  const [data_array, setData_array] = useState([]);
  const [notice, setNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState([]);

  const noticesPerPage = 5;
  const Noticeref = useRef(null);

  // useEffect(() => {
  //   const generateColors = (length) => {
  //     return Array.from({ length }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  //   };

  //   const colorInterval = setInterval(() => {
  //     const text = "Notice Board";
  //     setColors(generateColors(text.length));
  //   }, 1000);

  //   setColors(generateColors("Notice Board".length));

  //   return () => clearInterval(colorInterval);
  // }, []);

  useEffect(() => {
    const getNotice = async () => {
      try {
        const data = NewsData;

        // Check if data.links is defined and is an array
        if (data && Array.isArray(data.links)) {
          const lastFiftyNotices = data.links.slice(-50).reverse();
          setNotice(lastFiftyNotices);
          setData_array(lastFiftyNotices.slice(0, 3));
          setTotalPages(Math.ceil(lastFiftyNotices.length / noticesPerPage));
        } else {
          throw new Error("No notices found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    getNotice();
  }, []);

  const paginatedNotices = () => {
    const startIndex = (currentPage - 1) * noticesPerPage;
    const endIndex = startIndex + noticesPerPage;
    return notice.slice(startIndex, endIndex);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderColoredText = (text) => {
    return text.split("").map((letter, index) => (
      <span key={index} style={{ color: colors[index] || "#000000" }}>
        {letter}
      </span>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.notice}>
      <div className={styles.notice_div}>
        <h3 ref={Noticeref} className={styles.notice_title}>
          Notice Board
        </h3>

        {paginatedNotices().length ? (
          paginatedNotices().map((item, index) => (
            <div className={styles.notice_card} key={index}>
              <div className={styles.notice_card_upper}>
                <a href={item.url} className={styles.notice_link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
                <p className={styles.sendBody}>{item.sendbody}</p>
              </div>
              <p className={styles.date}>{item.date}</p>
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
          Previous
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
