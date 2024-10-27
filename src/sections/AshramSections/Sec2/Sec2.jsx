import React from 'react';
import styles from './styles/Sec2.module.scss';


const BhavaPrachaarSection = () => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src="https://scontent.frdp1-1.fna.fbcdn.net/v/t31.18172-8/17157848_1467449389940304_4749996005523922985_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f798df&_nc_ohc=vTsA9uAauhwQ7kNvgFcUIo1&_nc_ht=scontent.frdp1-1.fna&_nc_gid=AEZaj_L2ZCqYaMiA8633su_&oh=00_AYAdf_IwUlBUUa_o5eKguXMF7ahn68WEvMMTp-qNVtaukw&oe=67458AEA" alt="Placeholder" className={styles.image} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>Functions of Bhava Prachar Parishads</h2>
                <ol className={styles.text}>
                    <li>
                        It provides liaison between monks and lay devotees, that is, between the Bhava Prachar Committee, consisting of monks of the Order at the Headquarters of Ramakrishna Math, and the non-affiliated member Ashramas in a particular area.
                    </li>
                    <li>
                        The Bhava Prachar Parishad coordinates the work of the non-affiliated member centres of the area, and provides a common forum for those centres to discuss their problems and exchange their views.
                    </li>
                    <li>
                        Each Bhava Prachar Parishad keeps a watch on the working of the non-affiliated member Ashramas under it, and sees whether they follow the ideals and principles of Ramakrishna Movement. The apex Committee at Belur Math has formulated 10 guidelines for the non-affiliated member centres. The Bhava Prachar Parishad sees to it that all the member Ashramas under it function within the framework of these guidelines.
                    </li>
                </ol>
                <p className={styles.guidelinesNote}>
                    These Ten-point guidelines are given below.
                </p>
                <p style={{lineHeight: "1.7"}}>
                    <br />
                    <span style={{ fontWeight: "bold", color: "#555" }}>ভাবা প্রাচার পরিবারগুলির কার্যাবলীঃ</span> 

                    ভাব প্রচার পরিষদের তিনটি প্রধান কাজ রয়েছে। 

                    এটি সন্ন্যাসী এবং সাধারণ ভক্তদের মধ্যে যোগাযোগ প্রদান করে, অর্থাৎ, রামকৃষ্ণ মঠের সদর দফতরের সন্ন্যাসীদের নিয়ে গঠিত ভাব প্রচার কমিটি এবং একটি নির্দিষ্ট অঞ্চলের অ-অনুমোদিত সদস্য আশ্রমগুলির মধ্যে। 

                    ভাব প্রচার পরিষদ এলাকার অ-অনুমোদিত সদস্য কেন্দ্রগুলির কাজের সমন্বয় সাধন করে এবং সেই কেন্দ্রগুলিকে তাদের সমস্যা নিয়ে আলোচনা ও মতামত বিনিময়ের জন্য একটি সাধারণ ফোরাম প্রদান করে। 

                    প্রতিটি ভাব প্রচার পরিষদ তার অধীনে অ-অনুমোদিত সদস্য আশ্রমগুলির কাজের উপর নজর রাখে এবং দেখে যে তারা রামকৃষ্ণ আন্দোলনের আদর্শ ও নীতি অনুসরণ করে কিনা। বেলুর মঠের শীর্ষ কমিটি অ-অনুমোদিত সদস্য কেন্দ্রগুলির জন্য 10টি নির্দেশিকা প্রণয়ন করেছে। ভাব প্রচার পরিষদ দেখে যে তার অধীনে থাকা সমস্ত সদস্য আশ্রমগুলি এই নির্দেশিকাগুলির কাঠামোর মধ্যে কাজ করে। এই দশ দফা নির্দেশিকা নীচে দেওয়া হল।
                </p>
            </div>
        </div>
    );
};

export default BhavaPrachaarSection;
