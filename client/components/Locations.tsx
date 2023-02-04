// ==========================================================================
// COMPONENTS / #LOCATIONS
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import child components
 * 4. Import services
 * 5. Import react query
 *
 */
import React from 'react'; // [1]
import { useSearchParams } from 'react-router-dom'; // [2]
import { LocationList, Pagination } from './'; // [3]
import { RickMortyService } from '../services'; // [4]
import { useQuery } from '@tanstack/react-query'; // [5]

/**
 * Locations component for displaying all locations.
 *
 * @returns {React.ReactElement} React element
 * @example <Locations />
 *
 */ /*
 *
 * Search params
 * The `useSearchParams` hook is used to read and modify the query string in the URL.
 * 1. Returns an array of two values: the current location's search params and a function that may be used to update them, much like useSate.
 * 2. Get the page from the search params as a number, by default all seach params are strings.
 *
 * Query
 * 3. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 4. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using `getLocations` method from the service class.
 * Also passes in the `page` param.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * 5. Keep previous data
 * The data from the last sucessfull fetch is shown while the new data is being requested.
 * @see https://tanstack.com/query/v4/docs/react/guides/paginated-queries#better-paginated-queries-with-keeppreviousdata
 *
 * Is loading
 * The query has no data yet.
 * 6. Returns a loading JSX element.
 *
 * Is Error
 * The query encountered an error.
 * 7. Returns an error JSX element.
 *
 * Data
 * 8. Destruct info and results from data
 *
 * Page change handler
 * @param {number} newPage
 * Updates the page search param
 * 9. If the new page number is 1 remove the page search param from the url so we end up with a clean url and not ?page=1.
 * # / and /?page=1 are the same.
 * If the new page number is NOT 1 set the page search param to the new page.
 * # eg ?page=2
 *
 * Return component
 *
 */
export const Locations = (): React.ReactElement => {
    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [1]
    const page = Number(searchParams.get('page')) || 1; // [2]

    // Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['locations', { page }], // [3]
        queryFn: () => RickMortyService.instance.getLocations(page), // [4]
        keepPreviousData: true, // [5]
    });

    // Is loading
    if (isLoading) {
        return <p>Loading...</p>; // [6]
    }

    // Is Error
    if (isError) {
        return <p>An error occured.</p>; // [7]
    }

    // Data
    const { info, results } = data; // [8]

    // Page change handler
    const pageChangeHandler = (newPage: number) => {
        setSearchParams(searchParams => {
            newPage === 1 ? searchParams.delete('page') : searchParams.set('page', String(newPage)); // [9]
            return searchParams;
        });
    };

    // Return component
    return (
        <section>
            <h1>Locations</h1>
            <ul>
                <li>Count: {info.count}</li>
            </ul>

            <LocationList locations={results} />

            <Pagination
                page={page}
                totalPages={info.pages}
                prevPage={info.prev}
                nextPage={info.next}
                onPageChange={pageChangeHandler}
            />
        </section>
    );
};
