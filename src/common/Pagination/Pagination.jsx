import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={currentPage === i ? styles.active : ''}>
                    <button className={styles.pageButton} onClick={() => handlePageClick(i)}>
                        {i}
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className={styles.pagination}>
            <li>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
            </li>
            {renderPageNumbers()}
            <li>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Pagination;