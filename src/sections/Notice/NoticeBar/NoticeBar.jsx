import React, { useState, useEffect } from 'react';
import styles from './NoticeBar.module.scss';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';

const NoticeBar = () => {
    const [news, setNews] = useState({});

    const fetchNews = async () => {
        try {
            const response = await fetch(SummaryApi.NoticeFetch.url, {
                method: SummaryApi.NoticeFetch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            console.log(result.news);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            const data = result.notice;
            const news = data.filter((notice) => notice.sendbody !== "Technical" && notice.sendbody !== "Admission");
            setNews(news[news.length - 1] || {});
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className={styles.noticeBar}>
            <div className={styles.noticeContent}>
                <div className={styles.noticeHeader}>
                    <h3 className={styles.noticeTitle}>Notice</h3>
                    <span className={styles.latestNewsBadge}>Latest News</span>
                </div>

                {news.url ? (
                    <a href={news.url} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
                        {news.name}
                    </a>
                ) : (
                    <div className={styles.noNews}>
                        No latest news available
                    </div>
                )}

                <div className={styles.newsBody}>
                    {news.sendbody}
                </div>
            </div>
        </div>
    );
};

export default NoticeBar;
