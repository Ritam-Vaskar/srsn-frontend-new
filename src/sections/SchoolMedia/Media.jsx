import React, { useState, useEffect } from 'react';
import NewsCard from '../../components/newsEvent/newsEvent'; 
import newsData from '../../data/SchoolMedia.json';
const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);

   
    useEffect(() => {
        setNewsList(newsData); 
    }, []);

    return (
        <>
        <center><h1 style={{fontSize: '30px'}}>Media</h1></center>
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
