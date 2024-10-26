import React, { useState, useEffect } from 'react';
import styles from './NoticeBar.module.scss';
import NewsData from '../../../../public/NewsData.json';

const NoticeBar = () => {
    const [news, setNews] = useState({});

    useEffect(() => {
        const data = NewsData.links;
        setNews(data[data.length - 1] || {});
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.divider}>
                <h2>Notice</h2>
                <p>Latest News</p>
                {news.url ? (
                    <a href={news.url} target="_blank" rel="noopener noreferrer">{news.name}</a>
                ) : (
                    <p>No latest news available</p>
                )}
                <p className={styles.sendbody}>{news.sendbody}</p>
            </div>

        </div>
    );
};

export default NoticeBar;
