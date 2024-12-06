import React from "react";
import ObjectivesOfSevaSanghaSection from "../../sections/AshramSections/Sec5/Sec5";
import GallerySection from "../../sections/Gallery/Gallery";

const galleryItems = [
    { image: 'https://res.cloudinary.com/dfoljuppg/image/upload/v1733469980/hztvxhakhccyfjxqeoru.jpg', alt: 'Image 1' },
    { image: 'https://res.cloudinary.com/dfoljuppg/image/upload/v1733470125/zs4i1to73xb3oyjcc4lq.jpg', alt: 'Image 2' },
    // More items...
];

const facebookPosts = [
    { url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0RYZtvZFB9DgkY4RHwnPHQpAjv5xqMA1oj9eUY4ZSDeJ6PfzeMq8pQZM5uhh5Y5KKl&id=1059779857373928' },
    { url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02jNtwS35c95b8tcvkLwqKb44gXJP8KcxooUt8Ho4RspNuvNQ6hf6GsR3rXwbstPKvl&id=1059779857373928' },
    // More URLs...
];

const Media = () => {
    return (
        <div>
            <center style={{marginTop:'30px'}}>
                <h1>Media Gallery</h1>
                <p>Photos and videos related to Ashram activities.</p>
            </center>
            <ObjectivesOfSevaSanghaSection />
            <GallerySection galleryItems={galleryItems} facebookPosts={facebookPosts} />
        </div>
    );
};

export default Media;
