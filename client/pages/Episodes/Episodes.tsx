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
import { EpisodeList, Filters, Pagination } from '../../components'; // [3]
import { RickMortyService } from '../../services'; // [4]
import { useQuery } from '@tanstack/react-query'; // [5]
import { options } from '../../options'; // [6]
import { RM } from '../../types'; // [7]

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
 * Check data is not undefined
 * 7. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Data
 * 8. Destruct info and results from data
 *
 * Filters
 * 9. An array of filter objects passed to the filters component.
 *
 * Return component
 *
 */
export const Episodes = (): React.ReactElement | null => {
    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [1]
    const page = Number(searchParams.get('page')) || 1; // [2]
    const seasonSearchParam = searchParams.get(options.filters.season.searchParam) || ''; // [3]

    // Query
    const { data } = useQuery({
        queryKey: ['episodes', { page, season: seasonSearchParam }], // [4]
        queryFn: () => RickMortyService.instance.getEpisodes(page, seasonSearchParam), // [5]
        keepPreviousData: true, // [6]
    });

    // Check data is not undefined
    if (!data) return null; // [7]

    // Data
    const { info, results } = data; // [8]

    // Filters [9]
    const filters: RM.filterObjectProps[] = [
        {
            label: options.filters.season.label,
            data: options.filters.season.data,
            selected: seasonSearchParam,
            searchParam: options.filters.season.searchParam,
        },
    ];

    // Return component
    return (
        <section>
            <Filters data={filters} onFilterChange={setSearchParams} />

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
