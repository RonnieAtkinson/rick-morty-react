// ==========================================================================
// COMPONENTS / #CHARACTER
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react query
 * 3. Import Child components
 * 4. Import services
 * 5. Import utils
 * 6. Import types
 *
 */
import React, { useEffect } from 'react'; // [1]
import { useQuery } from '@tanstack/react-query'; // [2]
import { LocationLink } from './LocationLink'; // [3]
import { RickMortyService } from '../../services'; // [4]
import { StringUtil } from '../../utils'; // [5]
import { RM } from '../../types'; // [6]

/**
 * Component for displaying data about a single character.
 *
 * @param {object} props
 * @param {string} props.characterId Id of the character to fetch data for.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.onData Sets the `episodes` state in the parent.
 * @returns {React.ReactElement} React element
 * @example <CharacterInfo />
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
 * In this case were using `getCharacter` method from the service class.
 * Also passes in the `characterId` from the url params.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Check data is not undefined
 * 3. Data types are still <T | undefined> even when using suspense.
 * Will remove when a suspense specific function is available eg. useSuspenseQuery.
 * @see: https://github.com/TanStack/query/issues/1297
 *
 * Get the episode ids
 * 4. Get the episode ids from the array of episode urls.
 * An episode url looks like 'https://rickandmortyapi.com/api/episode/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 *
 * Pass the episode ids
 * 5. After this component has rendered to the dom pass the episode ids to the onData prop.
 * We use the episode ids in the parent component to render a list of episodes for this character.
 *
 * Return component
 *
 */
export const CharacterInfo = ({ characterId, onData }: RM.CharacterProps): React.ReactElement | null => {
    // Query
    const { data } = useQuery({
        queryKey: ['character', characterId], // [1]
        queryFn: () => RickMortyService.instance.getCharacter(characterId), // [2]
    });

    // Check data is not undefined
    if (!data) return null; // [3]

    // Get the episode ids
    const episodes: string[] = data.episode.map(episode => {
        return StringUtil.instance.getLastUrlPart(episode); // [4]
    });

    // Pass the episode ids
    useEffect(() => {
        onData(episodes); // [5]
    }, []);

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
        </section>
    );
};
