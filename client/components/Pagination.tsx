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
 * Page change handler
 * @param {number} newPage
 * Updates the page search param
 * 1. If the new page number is 1 remove the page search param from the url so we end up with a clean url and not ?page=1.
 * # / and /?page=1 are the same.
 * If the new page number is NOT 1 set the page search param to the new page.
 * # eg ?page=2
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
    // Page change handler
    const pageChangeHandler = (newPage: number) => {
        onPageChange((searchParams: URLSearchParams) => {
            console.log('Search Params: ', searchParams);

            newPage === 1 ? searchParams.delete('page') : searchParams.set('page', String(newPage)); // [11]
            return searchParams;
        });
    };

    // Return component
    return (
        <ul>
            <li>
                <button onClick={pageChangeHandler.bind(null, page - 1)} disabled={!prevPage ? true : false}>
                    Prev
                </button>
            </li>
            <li>
                {page} / {totalPages}
            </li>
            <li>
                <button onClick={pageChangeHandler.bind(null, page + 1)} disabled={!nextPage ? true : false}>
                    Next
                </button>
            </li>
        </ul>
    );
};
