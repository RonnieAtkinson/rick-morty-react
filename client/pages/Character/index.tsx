// ==========================================================================
// PAGES / CHARACTER / #INDEX
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
import { Character, EpisodesFor, Loader } from '../../components'; // [3]

/**
 * Character page component
 *
 */
export const PageCharacter = (): React.ReactElement => {
    // URL params
    const { characterId } = useParams(); // [1]

    // State
    const [episodes, setEpisodes] = useState([]);

    // Return component
    return (
        <section>
            <h1>Character</h1>
            <Suspense fallback={<Loader />}>
                <Character characterId={characterId} getEpisodeIds={setEpisodes} />

                <h3>{`${episodes.length} ${episodes.length === 1 ? 'Episode' : 'Episodes'}`}</h3>
                <Suspense fallback={<Loader />}>
                    <EpisodesFor cacheKeys={{ character: characterId, episodes }} episodeIds={episodes} />
                </Suspense>
            </Suspense>
        </section>
    );
};
