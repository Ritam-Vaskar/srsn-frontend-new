import React, { useEffect, useState } from 'react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import styles from './SearchPage.module.scss';

const SearchPage = ({ search }) => {
    const [searchList, setSearchList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const openModal = (alumni) => {
        setSelectedAlumni(alumni);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAlumni(null); // Reset alumni data when modal is closed
    };

    const findSearch = async () => {
        try {
            const response = await fetch(SummaryApi.AlumniSearch.url, {
                method: SummaryApi.AlumniSearch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ search })
            });
            const data = await response.json();
            setSearchList(data.alumni);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        if (search.length > 0) {
            findSearch();
        }
    }, [search]);

    return (
        <div>
            {searchList.length > 0 ? (
                <table className={styles.searchTable}>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Years</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchList.map((alumni, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={alumni.profilePic}
                                        alt={alumni.name}
                                        className={styles.alumniPhoto}
                                    />
                                </td>
                                <td>{alumni.name}</td>
                                <td>{alumni.startingYear} - {alumni.endingYear}</td>
                                <td>
                                    <button
                                        onClick={() => openModal(alumni)}
                                        className={styles.knowMoreButton}
                                    >
                                        Know More
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found.</p>
            )}

            {/* Modal implementation */}
            {isModalOpen && selectedAlumni && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <button onClick={closeModal} className={styles.closeButton}>X</button>
                        <img
                            src={selectedAlumni.profilePic}
                            alt={selectedAlumni.name}
                            className={styles.modalProfilePic}
                        />
                        <h3>{selectedAlumni.name}</h3>
                        <p><strong>Designation:</strong> {selectedAlumni.designation}</p>
                        <p><strong>Years:</strong> {selectedAlumni.startingYear} - {selectedAlumni.endingYear}</p>
                        <p><strong>Location:</strong> {selectedAlumni.currentState}</p>
                        <p>{selectedAlumni.bioData}</p>
                        <div className={styles.socialLinks}>
                            {selectedAlumni.socialMediaLinks?.map((link, index) => (
                                <a
                                    href={link}
                                    key={index}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Link {index + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
