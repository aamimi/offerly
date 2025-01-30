import React from 'react';
import {Button} from "@ui/button.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
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
            <Button
                variant={'outline'}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page">
                Previous
            </Button>
            {getPageNumbers().map((page, index) => (
                <Button
                    variant={`${page === currentPage ? 'default' : 'outline'}`}
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === currentPage || page === '...'}
                    aria-label={`Go to page ${page}`}>
                    {page}
                </Button>
            ))}
            <Button
                variant={'outline'}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page">
                Next
            </Button>
        </div>
    );
};

export default Pagination;