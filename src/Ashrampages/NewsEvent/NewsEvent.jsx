import React, { useState, useEffect } from 'react';
import NewsCard from '../../components/newsEvent/newsEvent';
import newsData from '../../data/news.json';
import SummaryApi from '../../common';
import './styles/NewsEvent.css';
const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);
    const fetchNewsData = async () => {
        try {
            const response = await fetch(SummaryApi.BlogFetch.url, {
                method: SummaryApi.BlogFetch.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();

            const newsdata = data.blog;

            const newData = newsdata.filter((notice) => notice.sender === 'ashram');
            console.log(newData);
            setNewsList(newData);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    }

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <>
            <center style={{ marginTop: '30px' }}><h1>News & Blogs</h1></center>
            <div className="news-page">

                {newsList.map((news, index) => (
                    <NewsCard
                        key={index}
                        image={news.image}
                        title={news.title}
                        date={news.updatedAt ? new Date(news.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                        time={news.updatedAt ? new Date(news.updatedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
                        content={news.content}
                    />
                ))}
            </div>
        </>
    );
};

export default NewsEvent;
