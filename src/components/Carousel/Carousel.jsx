import React from "react";
import styles from "./styles/Carousel.module.css";

const Carousel = ({ data }) => {
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {data.data_arr.map((item) => (
                    <div className={styles.carouselItem} key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.name} className={styles.carouselImage} />
                            <h3>{item.name}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
