// ==========================================================================
// COMPONENTS / #LOCATION
// ==========================================================================

/** Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import react query
 * 4. Import services
 * 5. Import child components
 * 6. Import utils
 *
 */
import React from 'react'; // [1]
import { useParams } from 'react-router-dom'; // [2]
import { useQuery } from '@tanstack/react-query'; // [3]
import { RickMortyService } from '../services'; // [4]
import { CharactersFor } from './'; // [5]
import { StringUtil } from '../utils'; // [6]

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
export const Location = (): React.ReactElement | null => {
    // URL params
    const { locationId } = useParams(); // [1]

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

    // Return component
    return (
        <section>
            <h2>{data.name}</h2>
            <ul>
                <li>Dimension: {data.dimension}</li>
                <li>Type: {data.type}</li>
            </ul>

            <h3>{`${data.residents.length} ${data.residents.length === 1 ? 'Resident' : 'Residents'}`}</h3>
            {!characters.length ? (
                <p>No know residents</p>
            ) : (
                <CharactersFor
                    cacheKeys={{ locationId: data.id }}
                    characterIds={characters}
                    noFilterResultsText='No residents that match those filters.'
                /> // [8]
            )}
        </section>
    );
};
