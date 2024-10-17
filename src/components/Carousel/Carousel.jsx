import React from "react";
import "./styles/Carousel.css";

const Carousel = () => {
    return (
        <div className="carousel-container">
            <div className="carousel">
                {data.data_arr.map((item) => (
                    <div className="carousel-item" key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.name} className="carousel-image" />
                            <h3>{item.name}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
