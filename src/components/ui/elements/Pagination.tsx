import React from 'react';
import { Button } from "@ui/button.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Interface for Pagination component props.
 *
 * @interface PaginationProps
 * @property {number} currentPage - The current active page.
 * @property {number} totalPages - The total number of pages.
 * @property {function} onPageChange - Callback function to handle page change.
 */
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const maxPagesToShow = 3;
const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

/**
 * Pagination component to navigate through pages.
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element} The rendered Pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    /**
     * Generates an array of page numbers to be displayed.
     *
     * @returns {(number|string)[]} An array of page numbers and ellipses.
     */
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= halfMaxPagesToShow + 1) {
            for (let i = 1; i <= maxPagesToShow + 1; i++) {
                pages.push(i);
            }
            pages.push('...', totalPages);
        } else if (currentPage > totalPages - halfMaxPagesToShow - 1) {
            pages.push(1, '...');
            for (let i = totalPages - maxPagesToShow; i <= totalPages; i++) {
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
        <nav className="flex justify-center space-x-2">
            <Button
                variant={'outline'}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page">
                <ChevronLeft />
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
                <ChevronRight />
            </Button>
        </nav>
    );
};

export default Pagination;