import React from 'react';
import styles from './styles/Sec5.module.scss';

const ObjectivesOfSevaSanghaSection = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>Objects of the Seva Sangha</h2>
        <p className={styles.introText}>
          The object for which the society is established is to promote the ideals and thoughts of Sri Sri Ramakrishna Paramhansha Dev, Sri Sri Maa Sarada and Sreemat Swami Vivekananda.
        </p>
        <ul className={styles.objectivesList}>
          <li>To promote Education among all the people of local areas irrespective of caste and creed.</li>
          <li>To work for development of Health, Education, Community Awareness etc.</li>
          <li>To publish periodicals, magazines, journals etc., for the development of community awareness.</li>
          <li>To arrange and organize Lectures, Debates, Discussions, Seminars, and Excursions for the diffusion of knowledge.</li>
          <li>To promote activities for creating awareness among people of the society against environmental pollution.</li>
          <li>To do all social welfare activities in rural and urban areas.</li>
        </ul>

        <h2 className={styles.title} style={{ color: "#ff6a00" }}>সেবা সংঘের উদ্দেশ্য</h2>
        <p className={styles.introText}>
          এই সমাজের উদ্দেশ্য হল শ্রী শ্রী রামকৃষ্ণ পরমহংস দেব, শ্রী শ্রী মা সারদা এবং শ্রীমত স্বামী বিবেকানন্দের আদর্শ ও চিন্তাভাবনার প্রচার করা।
        </p>
        <ul className={styles.objectivesList}>
          <li>জাতি ও ধর্ম নির্বিশেষে স্থানীয় সকল মানুষের মধ্যে শিক্ষার প্রসার ঘটানো।</li>
          <li>স্বাস্থ্য, শিক্ষা, সম্প্রদায় সচেতনতা ইত্যাদির উন্নয়নে কাজ করা।</li>
          <li>সামাজিক সচেতনতা বৃদ্ধির জন্য সাময়িকী, ম্যাগাজিন, জার্নাল ইত্যাদি প্রকাশ করা।</li>
          <li>জ্ঞানের বিস্তারের জন্য বক্তৃতা, বিতর্ক, আলোচনা, সেমিনার এবং ভ্রমণের ব্যবস্থা ও আয়োজন করা।</li>
          <li>পরিবেশ দূষণের বিরুদ্ধে সমাজের মানুষকে সচেতন করার জন্য কার্যক্রম প্রচার করা।</li>
          <li>গ্রামাঞ্চলে এবং শহরাঞ্চলে সমস্ত সমাজকল্যাণমূলক কাজকর্ম করা।</li>
        </ul>
      </div>
    </div>
  );
};

export default ObjectivesOfSevaSanghaSection;
