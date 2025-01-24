import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= halfMaxPagesToShow) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                pages.push(i);
            }
            pages.push('...', totalPages);
        } else if (currentPage > totalPages - halfMaxPagesToShow) {
            pages.push(1, '...');
            for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1, '...');
            for (let i = currentPage - halfMaxPagesToShow; i <= currentPage + halfMaxPagesToShow; i++) {
                pages.push(i);
            }
            pages.push('...', totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-base btn-outline"
            >
                Previous
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === currentPage || page === '...'}
                    className={`btn-base ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-base btn-outline"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;