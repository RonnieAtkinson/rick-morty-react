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
 * Check data is not undefined
 * 6. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Data
 * 7. Destruct info and results from data
 *
 * Return component
 *
 */
export const Locations = (): React.ReactElement | null => {
    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [1]
    const page = Number(searchParams.get('page')) || 1; // [2]

    // Query
    const { data } = useQuery({
        queryKey: ['locations', { page }], // [3]
        queryFn: () => RickMortyService.instance.getLocations(page), // [4]
        keepPreviousData: true, // [5]
    });

    // Check data is not undefined
    if (!data) return null; // [6]

    // Data
    const { info, results } = data; // [7]

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
                onPageChange={setSearchParams}
            />
        </section>
    );
};
