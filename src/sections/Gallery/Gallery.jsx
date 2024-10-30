import React from 'react';
import styles from './styles/Gallery.module.scss';

const GallerySection = ({ galleryItems, facebookPosts }) => {
  return (
    <div className={styles.gallerySection}>
      <h2 className={styles.title}>Gallery</h2>

      <div className={styles.gallery}>
        {galleryItems.map((item, index) => (
          <div key={index} className={styles.galleryItem}>
            <img src={item.image} alt={item.alt} className={styles.image} />
          </div>
        ))}
      </div>

      <h2 className={styles.title}>Our Facebook Posts</h2>
      <div className={styles.facebookEmbedContainer}>
        {facebookPosts.map((post, index) => (
          <div key={index} className={styles.facebookEmbed}>
            <iframe
              src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(post.url)}&show_text=true&width=500`}
              width="500"
              height="650"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
