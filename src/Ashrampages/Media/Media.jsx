import React from "react";
import ObjectivesOfSevaSanghaSection from "../../sections/AshramSections/Sec5/Sec5";
import GallerySection from "../../sections/Gallery/Gallery";

const galleryItems = [
    { image: 'https://scontent.frdp1-2.fna.fbcdn.net/v/t1.6435-9/43407061_2210006245684611_2276586675540852736_n.jpg?stp=dst-jpg_s600x600&_nc_cat=104&ccb=1-7&_nc_sid=f798df&_nc_ohc=uQoD70Zt2SEQ7kNvgHR7D7x&_nc_zt=23&_nc_ht=scontent.frdp1-2.fna&_nc_gid=A2zR-P83wNYM4FJS3QNGjTu&oh=00_AYAsPdnd-ksuozhlR0wys4obYAGUfMvLijGuzKg7sq0-NA&oe=674825CD', alt: 'Image 1' },
    { image: 'https://scontent.frdp1-1.fna.fbcdn.net/v/t1.6435-9/32161279_1997141686971069_7205232819327467520_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f798df&_nc_ohc=6a4KN4NaJbAQ7kNvgFhwE5u&_nc_zt=23&_nc_ht=scontent.frdp1-1.fna&_nc_gid=AVpJdQHUOrGVMvD2jEJJdka&oh=00_AYBh60vRahvDvDn_I_ur9MQwdThFLTVXW-7vPUDw6gCl9Q&oe=6748295E', alt: 'Image 2' },
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
