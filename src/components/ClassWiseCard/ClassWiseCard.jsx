// import React, { useState, useEffect } from 'react';
// import styles from './ClassWiseCard.module.scss';

// const BookList = ({ titile1, titile2, Prischool, SecSchool, flag, isImg,isDoc }) => {
//     const [Data, setData] = useState(flag ? Prischool : SecSchool);
//     const [selectedClass, setSelectedClass] = useState(flag ? 'ankur' : 'class5');

//     useEffect(() => {
//         setData(flag ? Prischool : SecSchool);
//         setSelectedClass(flag ? 'ankur' : 'class5');
//     }, [flag, Prischool, SecSchool]);

//     const handleClassClick = (className) => {
//         setSelectedClass(className);
//     };

//     const formatClassName = (className) => {
//         if (className.startsWith('class')) {
//             return className.replace('class', 'Class ');
//         }
//         return className.charAt(0).toUpperCase() + className.slice(1);
//     };

//     return (
//         <div className={styles.Container}>
//             <h2>{titile1}</h2>
//             <div className={styles.classButtons}>
//                 {Object.keys(Data).map((className) => (
//                     <button
//                         key={className}
//                         className={`${styles.classButton} ${selectedClass === className ? styles.selected : ''}`}
//                         onClick={() => handleClassClick(className)}
//                     >
//                         {formatClassName(className)}
//                     </button>
//                 ))}
//             </div>
//             {selectedClass && Data[selectedClass] && (
//                 <div className={styles.bookDetails}>
//                     <h3>{titile2} {formatClassName(selectedClass)}</h3>
//                     {!isImg && <ul>
//                         {Data[selectedClass].map((item, index) => (
//                             <li key={index}>{item}</li>
//                         ))}
//                     </ul>}
//                     {isImg &&
//                         <img src={Data[selectedClass]} alt={`Routine for ${selectedClass}`} />
//                     }
//                     {isDoc && typeof Data[selectedClass] === 'string' && (
//                         <a
//                             href={Data[selectedClass]}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Download Document
//                         </a>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookList;







// import React, { useState, useEffect } from 'react';
// import styles from './ClassWiseCard.module.scss';

// const BookList = ({ title1, title2, Prischool, SecSchool, flag, isImg, isDoc }) => {
//     const [Data, setData] = useState(flag ? Prischool : SecSchool);
//     const [selectedClass, setSelectedClass] = useState(flag ? 'beez' : 'class5');

//     useEffect(() => {
//         setData(flag ? Prischool : SecSchool);
//         setSelectedClass(flag ? 'beez' : 'class5');
//     }, [flag, Prischool, SecSchool]);

//     const handleClassClick = (className) => {
//         setSelectedClass(className);
//     };

//     const formatClassName = (className) => {
//         if (className.startsWith('class')) {
//             return className.replace('class', 'Class ');
//         }
//         return className.charAt(0).toUpperCase() + className.slice(1);
//     };

//     console.log(title1,title2);

//     return (
//         <div className={styles.Container}>
//             <h2>{title1}</h2>
//             <div className={styles.classButtons}>
//                 {Object.keys(Data || {}).map((className) => (
//                     <button
//                         key={className}
//                         className={`${styles.classButton} ${selectedClass === className ? styles.selected : ''}`}
//                         onClick={() => handleClassClick(className)}
//                         aria-pressed={selectedClass === className}
//                     >
//                         {formatClassName(className)}
//                     </button>
//                 ))}
//             </div>
//             {selectedClass && Data?.[selectedClass] && (
//                 <div className={styles.bookDetails}>
//                     <h3>{title2} {formatClassName(selectedClass)}</h3>
//                     {Array.isArray(Data[selectedClass]) && !isImg && !isDoc && (
//                         <ul>
//                             {Data[selectedClass].map((item, index) => (
//                                 <li key={index}>{item}</li>
//                             ))}
//                         </ul>
//                     )}
//                     {isImg && typeof Data[selectedClass] === 'string' && (
//                         <img
//                             src={Data[selectedClass]}
//                             alt={`Routine for ${formatClassName(selectedClass)}`}
//                         />
//                     )}
//                     {isDoc && typeof Data[selectedClass] === 'string' && (
//                         <a
//                             href={Data[selectedClass]}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Download Document
//                         </a>
//                     )}
//                 </div>
//             )}

//         </div>
//     );
// };

// export default BookList;




import React, { useState, useEffect } from 'react';
import styles from './ClassWiseCard.module.scss';

const BookList = ({ title1, title2, Prischool, SecSchool, flag, isImg, isDoc }) => {
    const [Data, setData] = useState(flag ? Prischool : SecSchool);
    const [selectedClass, setSelectedClass] = useState(flag ? 'beez' : 'class5');

    useEffect(() => {
        setData(flag ? Prischool : SecSchool);
        setSelectedClass(flag ? 'beez' : 'class5');
    }, [flag, Prischool, SecSchool]);

    const handleClassClick = (className) => {
        setSelectedClass(className);
    };

    const formatClassName = (className) => {
        if (className.startsWith('class')) {
            return className.replace('class', 'Class ');
        }
        return className.charAt(0).toUpperCase() + className.slice(1);
    };

    return (
        <div className={styles.Container}>
            <h2>{title1}</h2>
            <div className={styles.classButtons}>
                {Object.keys(Data).map((className) => (
                    <button
                        key={className}
                        className={`${styles.classButton} ${selectedClass === className ? styles.selected : ''}`}
                        onClick={() => handleClassClick(className)}
                        aria-pressed={selectedClass === className}
                    >
                        {formatClassName(className)}
                    </button>
                ))}
            </div>
            {selectedClass && Data[selectedClass] && (
                <div className={styles.bookDetails}>
                    <h3>{title2} {formatClassName(selectedClass)}</h3>
                    {!isImg && !isDoc && Array.isArray(Data[selectedClass]) && (
                        <ul>
                            {Data[selectedClass].map((item, index) => (
                                <li key={item.id || index}>{item}</li>
                            ))}
                        </ul>
                    )}
                    {isImg && (
                        <img src={Data[selectedClass]} alt={`Routine for ${selectedClass}`} />
                    )}
                    {isDoc && typeof Data[selectedClass] === 'string' && (
                        <a
                            href={Data[selectedClass]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Document
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookList;
