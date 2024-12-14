import React, { useState, useEffect } from 'react';
import styles from './NoticeBar.module.scss';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';

const NoticeBar = () => {
    const [news, setNews] = useState({});

    const fetchNews=async ()=>{
        try{
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
            const data=result.notice;
            const news = data.filter((notice) => notice.sendbody !== "Technical" && notice.sendbody !== "Admission");
            setNews(news[news.length - 1] || {});
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchNews();
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
