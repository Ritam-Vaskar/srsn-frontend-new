import React from 'react';
import styles from './styles/Sec4.module.scss';

const IdealsAndIdeologySection = () => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h2 className={styles.title}>Ideals</h2>
                <p className={styles.introText}>
                    Work as worship, potential divinity of the soul, and harmony of religions are three of the noteworthy ideals on which these are based. It is this ideal of service to man as service to God that sustains the Homeopathy dispensaries, schools, social welfare, and many other social service institutions run.
                </p>
                <p className={styles.introTextBengali}>
                    <strong>আদর্শঃ</strong><br />
                    উপাসনা হিসাবে কাজ করা, আত্মার সম্ভাব্য দেবত্ব এবং ধর্মের সম্প্রীতি হল তিনটি উল্লেখযোগ্য আদর্শ যার উপর এগুলি ভিত্তি করে। ঈশ্বরের সেবা হিসাবে মানুষের সেবার এই আদর্শই হোমিওপ্যাথি ডিসপেনসারি, স্কুল, সমাজ কল্যাণ এবং অন্যান্য অনেক সমাজসেবা প্রতিষ্ঠান পরিচালনা করে।
                </p>

                <h2 className={styles.title}>Ideology</h2>
                <p className={styles.introText}>
                    Sri Sri Ramakrishna Seva Sangha, a modern, universal, and practical ideology, embodies the eternal principles of Vedanta, as experienced by Sri Ramakrishna and Swami Vivekananda. These principles are applicable in daily life to solve problems, promoting a holistic approach to Vedanta.
                </p>
                <ul className={styles.idealsList}>
                    <li>God realization is the ultimate goal of life</li>
                    <li>Potential divinity of the soul</li>
                    <li>Synthesis of the Yogas</li>
                    <li>Morality based on strength</li>
                    <li>Harmony of Religions</li>
                    <li>Avatarhood of Sri Ramakrishna</li>
                    <li>
                        <strong>A New Philosophy of Work</strong>
                        <ul>
                            <li>a. All work is sacred.</li>
                            <li>b. Work as worship.</li>
                            <li>c. Service to man is service to God.</li>
                            <li>d. Focus on service to the poor and the downtrodden.</li>
                            <li>e. Work is a spiritual discipline.</li>
                        </ul>
                    </li>
                </ul>

                <p className={styles.introTextBengali}>
                    <strong>শ্রী শ্রী রামকৃষ্ণ সেবা সংঘ</strong> <br />
                    শ্রী শ্রী রামকৃষ্ণ সেবা সংঘ, একটি আধুনিক, সর্বজনীন এবং ব্যবহারিক মতাদর্শ, বেদান্তের চিরন্তন নীতিগুলিকে মূর্ত করে, যা শ্রী রামকৃষ্ণ এবং স্বামী বিবেকানন্দের অভিজ্ঞতা। এই নীতিগুলি সমস্যা সমাধানের জন্য দৈনন্দিন জীবনে প্রযোজ্য, বেদান্তের প্রতি একটি সামগ্রিক দৃষ্টিভঙ্গি প্রচার করে।
                </p>
                <ul className={styles.idealsListBengali}>
                    <li>ঈশ্বরের উপলব্ধি হল জীবনের চূড়ান্ত লক্ষ্য।</li>
                    <li>আত্মার সম্ভাব্য দেবত্ব</li>
                    <li>যোগের সংশ্লেষণ</li>
                    <li>শক্তির উপর ভিত্তি করে নৈতিকতা</li>
                    <li>ধর্মের সামঞ্জস্য</li>
                    <li>শ্রী রামকৃষ্ণের অবতার</li>
                    <li>
                        <strong>কাজের এক নতুন দর্শন</strong>
                        <ul>
                            <li>ক. সমস্ত কাজই পবিত্র।</li>
                            <li>খ. উপাসনার কাজ করুন।</li>
                            <li>গ. মানুষের সেবা হল ঈশ্বরের সেবা।</li>
                            <li>ঘ. দরিদ্র ও নিপীড়িতদের সেবায় মনোনিবেশ করুন।</li>
                            <li>ঙ. কাজ হল একটি আধ্যাত্মিক শৃঙ্খলা।</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default IdealsAndIdeologySection;
