// ==========================================================================
// COMPONENTS / #CHARACTER
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import react query
 * 4. Import Child components
 * 5. Import services
 * 6. Import utils
 *
 */
import React from 'react'; // [1]
import { useParams } from 'react-router-dom'; // [2]
import { useQuery } from '@tanstack/react-query'; // [3]
import { LocationLink, EpisodesFor } from './'; // [4]
import { RickMortyService } from '../services'; // [5]
import { StringUtil } from '../utils'; // [6]

/**
 * Component for displaying data about a single character.
 *
 * @returns {React.ReactElement} React element
 * @example <Character />
 *
 */ /*
 *
 * URL params
 * Key value pairs of the url params.
 * 1. Get the character id from the url.
 *
 * Query
 * 2. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 3. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using `getCharacter` method from the service class.
 * Also passes in the `characterId` from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Check data is not undefined
 * 4. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Get the episode ids
 * 5. Get the episode ids from the array of episode urls.
 * An episode url looks like 'https://rickandmortyapi.com/api/episode/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 *
 * Return component
 *
 */
export const Character = (): React.ReactElement | null => {
    // URL params
    const { characterId } = useParams(); // [1]

    // Query
    const { data } = useQuery({
        queryKey: ['character', characterId], // [2]
        queryFn: () => RickMortyService.instance.getCharacter(characterId), // [3]
    });

    // Check data is not undefined
    if (!data) return null; // [4]

    // Get the episode ids
    const episodes: string[] = data.episode.map(episode => {
        return StringUtil.instance.getLastUrlPart(episode); // [5]
    });

    // Return component
    return (
        <section>
            <h2>{data.name}</h2>
            <img src={data.image} alt={`${data.name} avatar`} />

            <ul>
                <li>
                    Species: {data.species} {data.type ? `(${data.type})` : ''}
                </li>
                <li>Gender: {data.gender}</li>
                <li>Status: {data.status}</li>
                <li>
                    Origin: <LocationLink name={data.origin.name} url={data.origin.url} />
                </li>
                <li>
                    Location: <LocationLink name={data.location.name} url={data.location.url} />
                </li>
            </ul>

            <h3>{`${data.episode.length} ${data.episode.length === 1 ? 'Episode' : 'Episodes'}`}</h3>
            <EpisodesFor cacheKeys={{ character: data.id }} episodeIds={episodes} />
        </section>
    );
};
