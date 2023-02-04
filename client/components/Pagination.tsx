// ==========================================================================
// COMPONENTS / #PAGINATION
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import types
 *
 */
import React from 'react'; // [1]
import { RM } from '../types'; // [2]

/**
 * Next and previous button pagination component.
 *
 * @param {object} props
 * @param {number} props.page The current page number.
 * @param {number} props.totalPages The total amount of pages.
 * @param {string} props.prevPage The url of the previous page. Used to check if theres a previous page.
 * @param {string} props.nextPage The url of the next page. Used to check if theres a next page.
 * @param {onPageChange} props.onPageChange - A page change handler function.
 * @returns {React.ReactElement} React element
 *
 * @example
 * <Pagination
 *      page={1}
 *      totalPages={5}
 *      prevPage={res.prevPage}
 *      nextPage={res.nextPage}
 *      onPageChange={pageChangeHandler}
 * />
 *
 */ /*
 *
 * Next page handler
 * 1. Page change callback, pass the new page number.
 *
 * Prev page handler
 * 2. Page change callback, pass the new page number.
 *
 * Return component
 *
 */
export const Pagination = ({
    page,
    totalPages,
    prevPage,
    nextPage,
    onPageChange,
}: RM.paginationProps): React.ReactElement => {
    // Next page handler
    const nextPageHandler = () => {
        onPageChange(page + 1); // [1]
    };

    // Prev page handler
    const prevPageHander = () => {
        onPageChange(page - 1); // [2]
    };

    // Return component
    return (
        <ul>
            <li>
                <button onClick={prevPageHander} disabled={!prevPage ? true : false}>
                    Prev
                </button>
            </li>
            <li>
                {page} / {totalPages}
            </li>
            <li>
                <button onClick={nextPageHandler} disabled={!nextPage ? true : false}>
                    Next
                </button>
            </li>
        </ul>
    );
};
