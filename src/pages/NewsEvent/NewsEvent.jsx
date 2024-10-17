import React, { useState, useEffect } from 'react';
import NewsCard from '../../components/newsEvent/newsEvent'; 
import newsData from '../../data/news.json';
import './styles/NewsEvent.css';
const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);

   
    useEffect(() => {
        setNewsList(newsData); 
    }, []);

    return (
        <>
        <h1>News & Blogs</h1>
        <div className="news-page">
            
            {newsList.map((news, index) => (
                <NewsCard
                    key={index}
                    image={news.image}
                    title={news.title}
                    date={news.date}
                    time={news.time}
                    content={news.content}
                />
            ))}
        </div>
        </>
    );
};

export default NewsEvent;
