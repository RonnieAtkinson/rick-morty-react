// ==========================================================================
// PAGES / EPISODE / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import page specific component
 * 4. Import child components
 *
 */
import React, { Suspense, useState } from 'react'; // [1]
import { useParams } from 'react-router-dom'; // [2]
import { EpisodeInfo } from './EpisodeInfo';
import { CharactersFor, Loader } from '../../components'; // [4]

/**
 * Episode page component
 *
 * @returns {React.ReactElement} React element
 * @example
 * <PageEpisode />
 *
 */ /*
 *
 * URL Params
 * Key value pairs of the url params
 * 1. Get the episode id from the url
 *
 * State
 * 2. State for the character ids, initially an empty array.
 * Updated with character ids for this episode from EpisodeInfo.
 *
 * Return component
 *
 */
export const PageEpisode = (): React.ReactElement => {
    // URL params
    const { episodeId } = useParams(); // [1]

    // State
    const [characters, setCharacters] = useState([]); // [2]

    // Return component
    return (
        <section>
            <h1>Episode</h1>
            <Suspense fallback={<Loader />}>
                <EpisodeInfo episodeId={episodeId} onData={setCharacters} />

                <h3>Characters</h3>
                <Suspense fallback={<Loader />}>
                    <CharactersFor
                        cacheKeys={{ episodeId, characters }}
                        characterIds={characters}
                        noFilterResultsText='No characters in this episode that match those filters.'
                    />
                </Suspense>
            </Suspense>
        </section>
    );
};
