// ==========================================================================
// COMPONENTS / #EPISODE
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import react query
 * 4. Import child components
 * 5. Import services
 * 6. Import utils
 *
 */
import React from 'react'; // [1]
import { useParams } from 'react-router-dom'; // [2]
import { useQuery } from '@tanstack/react-query'; // [3]
import { CharactersFor } from './'; // [4]
import { RickMortyService } from '../services'; // [5]
import { StringUtil } from '../utils'; // [6]

/**
 * Component for displaying data about a single episode.
 *
 * @returns {React.ReactElement} React element
 * @example <Episode />
 *
 */ /*
 *
 * URL Params
 * Key value pairs of the url params
 * 1. Get the episode id from the url
 *
 * Query
 * 2. Query Keys
 * Used for caching, needs to be unique to the query data.
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 *
 * 3. Query function
 * The query function can be any function the returns a promise.
 * The promise should either resolve the data or throw an error.
 * In this case were using `getEpisode` method from the service class.
 * Also passes in the `episodeId` from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Check data is not undefined
 * 4. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Get the character ids
 * 5. Get the character ids from the array of character urls
 * A character url looks like 'https://rickandmortyapi.com/api/character/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 *
 * Return component
 *
 */
export const Episode = (): React.ReactElement | null => {
    // URL params
    const { episodeId } = useParams(); // [1]

    // Query
    const { data } = useQuery({
        queryKey: ['episode', episodeId], // [2]
        queryFn: () => RickMortyService.instance.getEpisode(episodeId), // [3]
    });

    // Check data is not undefined
    if (!data) return null; // [4]

    // Get the character ids
    const characters: string[] = data.characters.map(character => {
        return StringUtil.instance.getLastUrlPart(character); // [5]
    });

    // Return component
    return (
        <section>
            <h2>Episode {data.episode}</h2>
            <ul>
                <li>Name: {data.name}</li>
                <li>Aired: {data.air_date}</li>
                <li>Created: {data.created}</li>
            </ul>

            <h3>Characters</h3>
            <CharactersFor
                cacheKeys={{ episodeId: data.id }}
                characterIds={characters}
                noFilterResultsText='No characters in this episode that match those filters.'
            />
        </section>
    );
};
