import React, { useState, useEffect } from 'react';
import NewsCard from '../../components/newsEvent/newsEvent';
import styles from './styles/NewsEvent.module.css';
// import newsData from '../../data/SchoolMedia.json';
import SummaryApi from '../../common';

const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNewsData = async () => {
        try {
            setLoading(true);
            const response = await fetch(SummaryApi.BlogFetch.url, {
                method: SummaryApi.BlogFetch.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            
            const newsdata = data.blog;
            
            const newData = newsdata.filter((notice) => notice.sender === 'school');
            console.log(newData);
            setNewsList(newData.reverse());
        } catch (error) {
            console.error('Error fetching news data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <div className={styles.mediaContainer}>
            <div className={styles.decorativeElement}></div>
            <div className={styles.floatingShape}></div>
            <div className={styles.floatingShape2}></div>
            
            <div className={styles.headerSection}>
                <div className={styles.badge}>
                    <span className={styles.badgeText}>Latest Updates</span>
                </div>
                <h1 className={styles.title}>
                    School <span className={styles.highlight}>Media</span>
                </h1>
                <p className={styles.subtitle}>
                    Stay updated with the latest news, events, and announcements from our school community
                </p>
                
            </div>

            {loading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Loading latest news...</p>
                </div>
            ) : (
                <div className={styles.newsGrid}>
                    {newsList.length > 0 ? (
                        newsList.map((news, index) => (
                            <NewsCard
                                key={index}
                                image={news.image}
                                title={news.title}
                                date={news.updatedAt ? new Date(news.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                                time={news.updatedAt ? new Date(news.updatedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
                                content={news.content}
                            />
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📰</div>
                            <h3>No News Available</h3>
                            <p>Check back later for the latest updates and announcements.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsEvent;