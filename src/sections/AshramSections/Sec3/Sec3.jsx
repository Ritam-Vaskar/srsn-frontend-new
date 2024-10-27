import React from 'react';
import styles from './styles/Sec3.module.scss';

const TenPointGuidelinesSection = () => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src="https://scontent.frdp1-2.fna.fbcdn.net/v/t31.18172-8/17097494_1467451646606745_6517047025817830611_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=m8DKThhsQ8MQ7kNvgEukiI5&_nc_ht=scontent.frdp1-2.fna&_nc_gid=AY3bLgQtY74gppfyISGOHQW&oh=00_AYCyiqMrdMsPDzkk72A7cbU60Xz1IEDyWbCPn_xHIidhww&oe=674599EC"
                    alt="Placeholder"
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>Ten-Point Guidelines</h2>
                <p className={styles.introText} style={{ fontWeight: "bold" }}>
                    To be eligible to be a member of the Ramakrishna-Vivekananda Bhava Prachar Parishad, a non-affiliated centre must abide by the following rules:
                </p>
                <ul className={styles.guidelinesList}>
                    <li>The private centre should be registered as a Religious Trust and/or under the Societies Registration Act and must follow the spiritual and ethical ideals and principles of the Ramakrishna Math and Ramakrishna Mission.</li>
                    <li>The private centre should maintain a close rapport with the Ramakrishna Math and Ramakrishna Mission.</li>
                    <li>Management committee members should have no connection with politics or organizations not approved by the Ramakrishna Math and Ramakrishna Mission.</li>
                    <li>No Swami who has left the Ramakrishna Order (except for medical reasons) should be associated with the private centre.</li>
                    <li>The centre must maintain proper financial records audited annually by Chartered Accountants.</li>
                    <li>The centre should provide social service among the poor in the immediate neighborhood.</li>
                    <li>The centre should engage in welfare work among rural and backward communities.</li>
                    <li>The centre should focus on local youth, organizing study circles and competitions, particularly observing Swami Vivekananda’s birthday.</li>
                    <li>The centre should hold classes on scriptures and promote Ramakrishna-Vivekananda literature through sales and libraries.</li>
                    <li>The centre should render relief services during calamities, either independently or under the Math and Mission's guidance.</li>
                </ul>

                <h2 className={styles.sectionTitle} style={{color: '#ff6a00'}}><br />দশ-বিন্দু নির্দেশিকা</h2>
                <p className={styles.introText} style={{ fontWeight: "bold" }}>
                    রামকৃষ্ণ-বিবেকানন্দ ভাব প্রচার পরিষদের সদস্য হওয়ার যোগ্য হওয়ার জন্য, একটি অ-অনুমোদিত কেন্দ্র, যাকে কখনও কখনও "বেসরকারী কেন্দ্র" হিসাবে উল্লেখ করা হয়, তাকে নিম্নলিখিত নিয়মগুলি মেনে চলতে হবে:
                </p>
                <ul className={styles.guidelinesList}>
                    <li><span className={styles.guidelinePoint}>বেসরকারী কেন্দ্র</span> ধর্মীয় ট্রাস্ট এবং/অথবা সোসাইটিজ রেজিস্ট্রেশন আইনের অধীনে নিবন্ধিত হতে হবে এবং রামকৃষ্ণ মঠ ও রামকৃষ্ণ মিশনের আধ্যাত্মিক ও নৈতিক আদর্শ ও নীতি অনুসরণ করতে হবে।</li>
                    <li><span className={styles.guidelinePoint}>রামকৃষ্ণ মঠ ও রামকৃষ্ণ মিশনের সঙ্গে ঘনিষ্ঠ সম্পর্ক</span> বেসরকারী কেন্দ্রের ঘনিষ্ঠ সম্পর্ক এবং অনুগত মনোভাব থাকা উচিত।</li>
                    <li><span className={styles.guidelinePoint}>রাজনৈতিক সম্পর্ক নিষিদ্ধ</span> পরিচালনা কমিটির সদস্যদের রাজনীতি বা রাজনৈতিক দলগুলির সাথে কোনও সম্পর্ক থাকা উচিত নয়। অনুমোদিত নয় এমন গোষ্ঠী ও সংস্থার সঙ্গেও সম্পর্ক থাকা উচিত নয়।</li>
                    <li><span className={styles.guidelinePoint}>স্বামীদের থাকার অনুমতি</span> যে কোনও কারণে রামকৃষ্ণ আদেশ ত্যাগ করেছেন এমন কোনও স্বামীকে কেন্দ্রে থাকতে বা যুক্ত হতে দেওয়া উচিত নয়।</li>
                    <li><span className={styles.guidelinePoint}>আর্থিক রেকর্ড</span> সঠিক রেকর্ড এবং বার্ষিক নিরীক্ষণ থাকা উচিত।</li>
                    <li><span className={styles.guidelinePoint}>সমাজসেবা</span> আশেপাশের দরিদ্রদের মধ্যে সমাজসেবা করতে হবে।</li>
                    <li><span className={styles.guidelinePoint}>কল্যাণমূলক কাজ</span> হরিজন, গিরিজান এবং অন্যান্য অনগ্রসর সম্প্রদায়ের জন্য কল্যাণমূলক কাজ করা।</li>
                    <li><span className={styles.guidelinePoint}>যুবকদের প্রতি মনোযোগ</span> সাপ্তাহিক বা পাক্ষিক অধ্যয়ন চক্র এবং বার্ষিক প্রতিযোগিতার আয়োজন করা।</li>
                    <li><span className={styles.guidelinePoint}>রামকৃষ্ণ-বিবেকানন্দ সাহিত্য</span> সাহিত্য বিক্রির ব্যবস্থা এবং একটি গ্রন্থাগার থাকা উচিত।</li>
                    <li><span className={styles.guidelinePoint}>ত্রাণ পরিষেবা</span> দুর্যোগে ত্রাণ পরিষেবা প্রদান করতে হবে।</li>
                </ul>
            </div>
        </div>
    );
};

export default TenPointGuidelinesSection;
