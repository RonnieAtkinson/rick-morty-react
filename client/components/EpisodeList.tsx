// ==========================================================================
// COMPONENTS / #EPISODE LIST
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import types
 *
 */
import React from 'react'; // [1]
import { Link } from 'react-router-dom'; // [2]
import { RM } from '../types'; // [3]

/**
 * Component for displaying a list of episode links.
 *
 * @param {object} props
 * @param {RM.episode[]} props.episodes An array of episode objects
 * @returns {React.ReactElement} React element
 * @example
 * <EpisodeList episodes={RM.episode[]} />
 *
 */
export const EpisodeList = ({ episodes }: { episodes: RM.episode[] }): React.ReactElement => {
    return (
        <ul className='episode-list'>
            {episodes.map(episode => (
                <li key={episode.id}>
                    {episode.episode} - <Link to={`/episodes/${episode.id}`}>{episode.name}</Link>
                </li>
            ))}
        </ul>
    );
};
