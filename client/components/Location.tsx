// ==========================================================================
// COMPONENTS / #LOCATION
// ==========================================================================

/** Imports
 *
 * 1. Import react
 * 2. Import react query
 * 3. Import services
 * 4. Import utils
 * 5. Import types
 *
 */
import React, { useEffect } from 'react'; // [1]
import { useQuery } from '@tanstack/react-query'; // [2]
import { RickMortyService } from '../services'; // [3]
import { StringUtil } from '../utils'; // [4]
import { RM } from '../types'; // [5]

/**
 * Component for displaying data about a single location.
 *
 * @returns {React.ReactElement} React element
 * @example <Location />
 *
 */ /*
 *
 * URL Params
 * Key value pairs of the url params.
 * 1. Get the location id from the url.
 *
 * Query
 * 2. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 3. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using getLocation method from the service class.
 * Also passes in the `locationId` from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Check data is not undefined
 * 4. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Get the character ids
 * 5. Get the character ids from the array of character urls.
 * A character url looks like 'https://rickandmortyapi.com/api/character/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 *
 * Return component
 *
 */
export const Location = ({ locationId, getCharacterIds }: RM.LocationProps): React.ReactElement | null => {
    // Query
    const { data } = useQuery({
        queryKey: ['location', locationId], // [2]
        queryFn: () => RickMortyService.instance.getLocation(locationId), // [3]
    });

    // Check data is not undefined
    if (!data) return null; // [4]

    // Get the resident ids
    const characters: string[] = data.residents.map(character => {
        return StringUtil.instance.getLastUrlPart(character); // [5]
    });

    useEffect(() => {
        getCharacterIds(characters);
    }, []);

    // Return component
    return (
        <section>
            <h2>{data.name}</h2>
            <ul>
                <li>Dimension: {data.dimension}</li>
                <li>Type: {data.type}</li>
            </ul>
        </section>
    );
};
