// ==========================================================================
// COMPONENTS / #EPISODE LIST
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react query
 * 3. Import child components
 * 4. Import services
 * 5. Import utilities
 * 6. Import types
 *
 */
import React from 'react'; // [1]
import { useQuery } from '@tanstack/react-query'; // [2]
import { EpisodeList } from './EpisodeList'; // [3]
import { RickMortyService } from '../services'; // [4]
import { ArrayUtil } from '../utils'; // [5]
import { RM } from '../types'; // [6]

/**
 * Component for displaying episodes associated with another resource.
 * - eg. All episodes that a `character` appears in.
 *
 * @param {object} props
 * @param {string[]} props.episodeIds An array of episode id's
 * @returns {React.ReactElement} React element
 * @example <EpisodeList episodeIds={['1', '2', '3']}
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
 * In this case were using `getEpisodes` method from the service class.
 * Also passes in the page param.
 * @see https://tanstack.com/query/v4/docs/react/guides/query-functions
 *
 * Is loading
 * The query has no data yet.
 * 3. Returns a loading JSX element.
 *
 * Is Error
 * The query encountered an error.
 * 4. Returns an error JSX element.
 *
 * Make sure data is an array
 * If the data only returns a single episode it will be an object. It needs to be an array when we come to map.
 * 5. Returns the data untouched if it's already an array, or pushes data to a new array if its an object,
 *    if the data is neither an array or an object returns an empty array.
 *
 * Group the episodes by season
 * 6. Group the data by season number
 * eg. [
 * {number: '1', episodes: [RM.episode[]]}
 * {number: '2', episodes: [RM.episode[]]}
 * ]
 *
 * Return component
 *
 */
export const EpisodesFor = ({
    cacheKeys,
    episodeIds,
}: {
    cacheKeys: any;
    episodeIds: string[];
}): React.ReactElement => {
    // Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['episodes', cacheKeys], // [1]
        queryFn: () => RickMortyService.instance.getMultipleEpisodes(episodeIds), // [2]
    });

    // Is loading
    if (isLoading) {
        return <span>Loading...</span>; // [3]
    }

    // Is error
    if (isError) {
        return <span>Error</span>; // [4]
    }

    // Make sure data is an array
    const updatedData: RM.episode[] = ArrayUtil.instance.getArrayFor(data); // [5]

    // Group the episodes by season
    const seasonGroupedData = ArrayUtil.instance.groupBySeasons(updatedData); // [6]

    // Return component
    return (
        <section>
            <ul>
                {seasonGroupedData.map(season => (
                    <li key={season.number}>
                        Season {season.number}
                        <EpisodeList episodes={season.episodes} />
                    </li>
                ))}
            </ul>
        </section>
    );
};
