// ==========================================================================
// COMPONENTS / #EPISODES
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import child components
 * 4. Import services
 * 5. Import react query
 * 6. Import options
 * 7. Import types
 *
 */
import React from 'react'; // [1]
import { useSearchParams } from 'react-router-dom'; // [2]
import { EpisodeList, Filters, Pagination } from './'; // [3]
import { RickMortyService } from '../services'; // [4]
import { useQuery } from '@tanstack/react-query'; // [5]
import { options } from '../options'; // [6]
import { RM } from '../types'; // [7]

/**
 * Episodes component for displaying all episodes.
 *
 * @returns {React.ReactElement} React element
 * @example <Episodes />
 *
 */ /*
 *
 * Search params
 * The `useSearchParams` hook is used to read and modify the query string in the URL.
 * 1. Returns an array of two values: the current location's search params and a function that may be used to update them, much like useSate.
 * 2. Get the page from the search params as a number, by default all seach params are strings.
 * 3. Get the season from the search params or an empty string if the search param is not in the url.
 *    # eg ?season=s01
 *
 * Query
 * 4. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 5. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using `getEpisodes` method from the service class.
 * Also passes in the `page` and `season` search params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * 6. Keep previous data
 * The data from the last sucessfull fetch is shown while the new data is being requested.
 * @see https://tanstack.com/query/v4/docs/react/guides/paginated-queries#better-paginated-queries-with-keeppreviousdata
 *
 * Is loading
 * The query has no data yet.
 * 7. Returns a loading JSX element.
 *
 * Is Error
 * The query encountered an error.
 * 8. Returns an error JSX element.
 *
 * Data
 * 9. Destruct info and results from data
 *
 * Filter change hander
 * Updates the filter search params
 * @param {string} searchKey
 * @param {string} searchValue
 * 10. If theres no search value the user has slected 'All' which has a value of '', remove the search param from the url.
 * If there is a search value assign it.
 * 11. Remove the page search param so we always start from the first page of the filtered results.
 *
 * Filters
 * 12. An array of filter objects passed to the filters component.
 *
 * Return component
 *
 */
export const Episodes = (): React.ReactElement => {
    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [1]
    const page = Number(searchParams.get('page')) || 1; // [2]
    const seasonSearchParam = searchParams.get(options.filters.season.searchParam) || ''; // [3]

    // Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['episodes', { page, season: seasonSearchParam }], // [4]
        queryFn: () => RickMortyService.instance.getEpisodes(page, seasonSearchParam), // [5]
        keepPreviousData: true, // [6]
        // useErrorBoundary: true,
    });

    // Is loading
    if (isLoading) {
        return <p>Loading...</p>; // [7]
    }

    // Is Error
    if (isError) {
        return <p>An error occured.</p>; // [8]
    }

    // Data
    const { info, results } = data; // [9]

    // Filter handler
    const filterChangeHandler = (searchKey: string, searchValue: string) => {
        setSearchParams(searchParams => {
            !searchValue ? searchParams.delete(searchKey) : searchParams.set(searchKey, searchValue); // [10]
            searchParams.delete('page'); // [11]
            return searchParams;
        });
    };

    // Filters [12]
    const filters: RM.filterProps[] = [
        {
            label: options.filters.season.label,
            data: options.filters.season.data,
            selected: seasonSearchParam,
            searchParam: options.filters.season.searchParam,
            onFilterChange: filterChangeHandler,
        },
    ];

    // Return component
    return (
        <section>
            <h1>Episodes</h1>
            <Filters data={filters} />

            <ul>
                <li>Count: {info.count}</li>
            </ul>

            <EpisodeList episodes={results} />

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
