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
import { RickMortyService } from '../../services'; // [3]
import { StringUtil } from '../../utils'; // [4]
import { RM } from '../../types'; // [5]

/**
 * Component for displaying data about a single location.
 *
 * @param {object} props
 * @param {string} props.locationId Id of the location to fetch data for.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.onData Sets the `characters` state in the parent.
 * @returns {React.ReactElement} React element
 * @example <LocationInfo />
 *
 */ /*
 *
 * Query
 * 1. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 2. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using getLocation method from the service class.
 * Also passes in the `locationId` from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Check data is not undefined
 * 3. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Get the character ids
 * 4. Get the character ids from the array of character urls.
 * A character url looks like 'https://rickandmortyapi.com/api/character/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 *
 * Pass the character ids
 * 5. After this component has rendered to the dom pass the character ids to the onData prop.
 * We use the character ids in the parent component to render a list of `residents` for this location.
 *
 * Return component
 *
 */
export const LocationInfo = ({ locationId, onData }: RM.LocationProps): React.ReactElement | null => {
    // Query
    const { data } = useQuery({
        queryKey: ['location', locationId], // [1]
        queryFn: () => RickMortyService.instance.getLocation(locationId), // [2]
    });

    // Check data is not undefined
    if (!data) return null; // [3]

    // Get the character ids
    const characters: string[] = data.residents.map(character => {
        return StringUtil.instance.getLastUrlPart(character); // [4]
    });

    // Pass the character ids
    useEffect(() => {
        onData(characters); // [5]
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
