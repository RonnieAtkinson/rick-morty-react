// ==========================================================================
// PAGES / EPISODE / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import child components
 *
 */
import React, { Suspense, useState } from 'react'; // [1]
import { useParams } from 'react-router-dom'; // [2]
import { Episode, CharactersFor, Loader } from '../../components'; // [3]

/**
 * Episode page component
 *
 */
export const PageEpisode = () => {
    // URL params
    const { episodeId } = useParams(); // [1]

    // State
    const [characters, setCharacters] = useState([]);

    // Return component
    return (
        <section>
            <h1>Episode</h1>
            <Suspense fallback={<Loader />}>
                <Episode episodeId={episodeId} getCharacterIds={setCharacters} />

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