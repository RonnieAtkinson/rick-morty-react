// ==========================================================================
// COMPONENTS / #CHARACTERS FOR
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import services
 * 4. Import child components
 * 5. Import react query
 * 6. Import utils
 * 7. Import types
 * 8. Import options
 *
 */
import React, { Fragment } from 'react'; // [1]
import { useSearchParams } from 'react-router-dom'; // [2]
import { RickMortyService } from '../services'; // [3]
import { CharacterList, Filters } from './'; // [4]
import { useQuery } from '@tanstack/react-query'; // [5]
import { ArrayUtil } from '../utils'; // [6]
import { RM } from '../types'; // [7]
import { options } from '../options'; // [8]

/**
 * Component for displaying characters associated with another resource.
 * - eg. All characters in an `episode`.
 * - eg. All characters from a `location`.
 *
 * @param {object} props
 * @param {any} props.cacheKeys The cache keys for react query
 * @param {string[]} props.characterIds An array of character id's
 * @param {string | undefined} props.noFilterResultsText Message to show when the filters return no results
 * @returns {React.ReactElement} React element
 * @example
 * <Characters
 *      cacheKeys={{ episodeId: '1' }}
 *      characterIds={['1', '2', '3']}
 *      noFilterResultsText='No results'
 * />
 *
 */ /*
 *
 * Options
 * Define some new search param keys here, we'll use them while getting the search params from the URL
 * and we'll also need to pass them to the filters.
 *
 * 1. Add a prefix to the default value for the status search param.
 * 2. Add a prefix to the default value for the gender search param.
 *
 * Adding a prefix for context when filtering characters on another resource.
 * # eg. /episode/1/?character_gender=male&character_status=alive
 * # instead of /episode/1/?gender=male&status=alive
 *
 * Search params
 * The `useSearchParams` hook is used to read and modify the query string in the URL.
 * 3. Returns an array of two values: the current location's search params and a function that may be used to update them, much like useSate.
 * 4. Get the status from the search params or an empty string if the search param is not in the url.
 *    # Uses the search param key set in [1]
 *    # eg ?character_status=alive
 * 5. Get the gender from the search params or an empty string if the search param is not in the url.
 *    # Uses the gender param key set in [2]
 *    # eg ?character_gender=female
 *
 * Query
 * 6. Query keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 7. Query function
 * The query function can be any function that returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using `getMultipleCharacters` method from the service class.
 * Also passes in an array of character ids.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Is loading
 * The query has no data yet.
 * 8. Returns a loading JSX element.
 *
 * Is Error
 * The query encountered an error.
 * 9. Returns an error JSX element.
 *
 * Make sure data is an array
 * If the data only returns a single character it will be an object. It needs to be an array when we come to map.
 * 10. Returns the data untouched if it's already an array, or pushes data to a new array if its an object,
 *    if the data is neither an array or an object returns an empty array.
 *
 * Filter handler
 * Updates the filter search params
 * @param {string} searchKey
 * @param {string} searchValue
 * 11. If theres no search value the user has slected 'All' which has a value of '', remove the search param from the url.
 * If there is a search value assign it.
 *
 * Filtered characters data
 * The api doesn't provide a way to filter characters for a resource so we'll have to filter the data we already have.
 * 12. If neither the gender or the status search params have been set then just return true on the filter, we'll need them all.
 * 13. If only the gender param is falsy the user has selected a status. Return all the characters whos status match the value of the search param.
 * 14. If only the status param is falsy the user has selected a gender. Return all the characters whos gender match the value of the search param.
 * 15. If neither status params are falsy the user has selected a status and a gender. Return all the characters whos status and gender match the values of the search params.
 * These values are case-insensitive so if character.gender: 'Female', but the search param is gender=female the equality will still be true.
 *
 * Custom sort order
 * Array.sort() functions.
 * 16. Custom array sort function for gender.
 * 17. Custom array sort function for status.
 *
 * Gender filters
 * Create gender filters based on the gender values from the original query.
 * For example if there are only male and genderless characters in an episode only male and genderless will be added as filters. Not female, etc.
 * Orders the filters based on their order in options so they remain the same sitewide.
 * 18. Adds the first filter from gender which is 'All', eg: { name: 'All', value: '' }
 * 19. Adds the rest of the gender filters for the current query in the correct order.
 *
 * Status filters
 * Create status filters based on the gender values from the original query.
 * For example if there are only alive characters in an episode only alive will be added as a filter. Not dead, unknown, etc.
 * Orders the filters based on their order in options so they remain the same sitewide.
 * 20. Adds the first filter from status which is 'All', eg: { name: 'All', value: '' },
 * 21. Adds the rest of the status filters for the current query in the correct order.
 *
 * Filters
 * 22. An array of filter objects passed to the filters component.
 *
 * Return component
 * 23. If theres no characters in the filtered array show a message instead.
 * An optional prop may be used for this (noFilterResultsText), if no prop is present use a fallback from the options.
 *
 */
export const CharactersFor = ({
    cacheKeys,
    characterIds,
    noFilterResultsText,
}: {
    cacheKeys: any;
    characterIds: string[];
    noFilterResultsText?: string;
}): React.ReactElement => {
    // Options
    const statusSearchParamKey = `character_${options.filters.status.searchParam}`; // [1]
    const genderSearchParamKey = `character_${options.filters.gender.searchParam}`; // [2]

    // Search params
    const [searchParams, setSearchParams] = useSearchParams(); // [3]
    const statusSearchParam = searchParams.get(statusSearchParamKey) || ''; // [4]
    const genderSearchParam = searchParams.get(genderSearchParamKey) || ''; // [5]

    // Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['characters', cacheKeys], // [6]
        queryFn: () => RickMortyService.instance.getMultipleCharacters(characterIds), // [7]
    });

    // Is loading
    if (isLoading) {
        return <span>Loading...</span>; // [8]
    }

    // Is error
    if (isError) {
        return <span>Error</span>; // [9]
    }

    // Make sure data is an array
    const updatedData: RM.character[] = ArrayUtil.instance.getArrayFor(data); // [10]

    // Filter handler
    const filterChangeHandler = (searchKey: string, searchValue: string) => {
        setSearchParams(searchParams => {
            !searchValue ? searchParams.delete(searchKey) : searchParams.set(searchKey, searchValue); // [11]
            return searchParams;
        });
    };

    // Filter characters data
    const filteredCharacters = updatedData.filter(character => {
        if (!genderSearchParam && !statusSearchParam) return true; // [12]
        if (!genderSearchParam) return character.status.toLowerCase() === statusSearchParam.toLowerCase(); // [13]
        if (!statusSearchParam) return character.gender.toLowerCase() === genderSearchParam.toLowerCase(); // [14]
        return (
            character.gender.toLowerCase() === genderSearchParam.toLowerCase() &&
            character.status.toLowerCase() === statusSearchParam.toLowerCase() // [15]
        );
    });

    // Custom sort order
    const genderSort = ArrayUtil.instance.sortStringsByObjectsIn(options.filters.gender.data, 'name'); // [16]
    const statusSort = ArrayUtil.instance.sortStringsByObjectsIn(options.filters.status.data, 'name'); // [17]

    // Gender filters
    const genderFilters = [
        options.filters.gender.data[0], // [18]
        ...ArrayUtil.instance.getFilterValuesFor('gender', updatedData, genderSort), // [19]
    ];

    // Status filters
    const statusFilters = [
        options.filters.status.data[0], // [20]
        ...ArrayUtil.instance.getFilterValuesFor('status', updatedData, statusSort), // [21]
    ];

    // Filters [22]
    const filters: RM.filterProps[] = [
        {
            label: options.filters.gender.label,
            data: genderFilters,
            selected: genderSearchParam,
            searchParam: genderSearchParamKey,
            onFilterChange: filterChangeHandler,
        },
        {
            label: options.filters.status.label,
            data: statusFilters,
            selected: statusSearchParam,
            searchParam: statusSearchParamKey,
            onFilterChange: filterChangeHandler,
        },
    ];

    // Return component
    return (
        <Fragment>
            <Filters data={filters} />
            {!filteredCharacters.length ? (
                <p>{noFilterResultsText || options.defaultText.noFilterResults}</p> // [25]
            ) : (
                <CharacterList characters={filteredCharacters} />
            )}
        </Fragment>
    );
};
