// ==========================================================================
// COMPONENTS / #CHARACTERS
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
import { CharacterList, Filters, Pagination } from '../../components'; // [3]
import { RickMortyService } from '../../services'; // [4]
import { useQuery } from '@tanstack/react-query'; // [5]
import { options } from '../../options'; // [6]
import { RM } from '../../types'; // [7]

/**
 * Characters component for displaying all characters.
 *
 * @returns {React.ReactElement | null} React element
 * @example <Characters />
 *
 */ /*
 *
 * Search params
 * The useSearchParams hook is used to read and modify the query string in the URL.
 * 1. Returns an array of two values: the current location's search params and a function that may be used to update them, much like useSate.
 * 2. Get the page from the search params as a number, by default all seach params are strings.
 * 3. Get the status from the search params or an empty string if the search param is not in the url.
 *    # eg ?status=alive
 * 4. Get the gender from the search params or an empty string if the search param is not in the url.
 *    # eg ?gender=female
 * The name of the search parameters are pulled from the options for uniformity across paths and components.
 *
 * Query
 * 5. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 6. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using getCharacters method from the service class.
 * Also passes in the page, status, and gender which are set from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * 7. Keep previous data
 * The data from the last sucessfull fetch is shown while the new data is being requested.
 * @see https://tanstack.com/query/v4/docs/react/guides/paginated-queries#better-paginated-queries-with-keeppreviousdata
 *
 * Check data is not undefined
 * 8. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Data
 * 9. Destruct info and results from data
 *
 * Filters
 * 10. An array of filter objects passed to the filters component.
 *
 * Return component
 *
 */
export const Characters = (): React.ReactElement | null => {
    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [1]
    const page = Number(searchParams.get('page')) || 1; // [2]
    const statusSearchParam = searchParams.get(options.filters.status.searchParam) || ''; // [3]
    const genderSearchParam = searchParams.get(options.filters.gender.searchParam) || ''; // [4]

    // Query
    const { data } = useQuery({
        queryKey: ['characters', { page, status: statusSearchParam, gender: genderSearchParam }], // [5]
        queryFn: () => RickMortyService.instance.getCharacters(page, statusSearchParam, genderSearchParam), // [6]
        keepPreviousData: true, // [7]
    });

    // Check data is not undefined
    if (!data) return null; // [8]

    // Data
    const { info, results } = data; // [9]

    // Filters [10]
    const filters: RM.filterObjectProps[] = [
        {
            label: options.filters.gender.label,
            data: options.filters.gender.data,
            selected: genderSearchParam,
            searchParam: options.filters.gender.searchParam,
        },
        {
            label: options.filters.status.label,
            data: options.filters.status.data,
            selected: statusSearchParam,
            searchParam: options.filters.status.searchParam,
        },
    ];

    // Return component
    return (
        <section>
            <Filters data={filters} onFilterChange={setSearchParams} />

            <ul>
                <li>Count: {info.count}</li>
            </ul>

            <CharacterList characters={results} />

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
