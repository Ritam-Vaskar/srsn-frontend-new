import React from 'react';
import styles from './styles/Sec1.module.scss';


const HomePageSection = () => {
    return (
        <>
        <center><h1 className={styles.heading}><span style={{color: "var(--ashram-yellow)"}}>Bhava Prachar </span>Parishads</h1></center>
        <div className={styles.card}>
            
            <div className={styles.imageContainer}>
                <img src="https://res.cloudinary.com/dfoljuppg/image/upload/v1733468754/vrdu12oukn7pyvu86ki8.webp" alt="Belur Math" className={styles.image} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>Sri Sri Ramakrishna Seva Sangha (Haridasnagar)</h2>
                <center><p className={styles.text} style={{color: "#555"}}>
                    Affiliated by Bhava Prachar Parishad in the year 2005. <br />
                </p></center>
                <p className={styles.text}>
                    <br />
                    The lay devotees of Sri Ramakrishna are found in almost all parts of India and in some other parts of the world. Wherever they are, they form groups and start Ashrams, study circles, etc. Many of these centres have temples dedicated to Sri Ramakrishna. Some of these centres were originally started under the influence of some of the disciples of Sri Ramakrishna or their disciples. Most of these centres are managed by lay devotees and function independently of Ramakrishna Math and Ramakrishna Mission. There are hundreds of such non-affiliated centres in India.
                    <br /> <br />
                    ভারতের প্রায় সর্বত্র এবং বিশ্বের অন্যান্য অংশে শ্রী রামকৃষ্ণের সাধারণ ভক্তদের পাওয়া যায়। তারা যেখানেই থাকুক না কেন, তারা দল গঠন করে এবং আশ্রম, অধ্যয়ন চক্র ইত্যাদি শুরু করে। এই কেন্দ্রগুলির মধ্যে অনেকগুলিতে শ্রী রামকৃষ্ণকে উৎসর্গীকৃত মন্দির রয়েছে। এই কেন্দ্রগুলির মধ্যে কয়েকটি মূলত শ্রী রামকৃষ্ণের কয়েকজন শিষ্য বা তাঁদের শিষ্যদের প্রভাবে শুরু হয়েছিল। এই কেন্দ্রগুলির অধিকাংশই সাধারণ ভক্তদের দ্বারা পরিচালিত হয় এবং রামকৃষ্ণ মঠ ও রামকৃষ্ণ মিশন থেকে স্বাধীনভাবে কাজ করে। ভারতে এই ধরনের শত শত অ-অনুমোদিত কেন্দ্র রয়েছে। 


                </p>
                <br />
                <p className={styles.text}>
                    These non-affiliated centres follow to a great extent the ideals and principles of Ramakrishna Mission such as ATMANO MOKSHARTHAM JAGAD HITAYA CHA, “For one’s own salvation and for the good of the world.” They conduct activities similar to those conducted by Ramakrishna Mission such as running schools, hostels, orphanages, non-formal schools, coaching centres, dispensaries, mobile medical units, rural development work, and also undertake relief work during calamities. These activities are carried out on the basis of the principle, shiva jnane jiva seva (“Service to man as service to God”) and “work as worship”.
                    <br /> <br />
                    এই অ-অনুমোদিত কেন্দ্রগুলি রামকৃষ্ণ মিশনের আদর্শ ও নীতিগুলি অনেকাংশে অনুসরণ করে যেমন আত্মানো মোক্ষম জগদ হিতায়া চা, "নিজের মুক্তির জন্য এবং বিশ্বের ভালোর জন্য"। তারা রামকৃষ্ণ মিশন দ্বারা পরিচালিত কার্যক্রমের অনুরূপ কার্যক্রম পরিচালনা করে যেমন স্কুল, হোস্টেল, এতিমখানা, অনানুষ্ঠানিক স্কুল, কোচিং সেন্টার, ডিসপেনসারি, ভ্রাম্যমাণ মেডিকেল ইউনিট, গ্রামীণ উন্নয়ন কাজ এবং দুর্যোগের সময় ত্রাণ কাজ পরিচালনা করে। এই ক্রিয়াকলাপগুলি শিব জ্ঞানে জীব সেবা ("ঈশ্বরের সেবা হিসাবে মানুষের সেবা") এবং "উপাসনা হিসাবে কাজ" নীতির ভিত্তিতে পরিচালিত হয়।
                </p>
                
            </div>
        </div>
        </>
    );
};

export default HomePageSection;
