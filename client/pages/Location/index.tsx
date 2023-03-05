// ==========================================================================
// PAGES / LOCATION / #INDEX
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
import { Location, CharactersFor, Loader } from '../../components'; // [3]

/**
 * Location page component
 *
 */
export const PageLocation = () => {
    // URL params
    const { locationId } = useParams(); // [1]

    // State
    const [characters, setCharacters] = useState([]);

    // Return component
    return (
        <section>
            <h1>Location</h1>
            <Suspense fallback={<Loader />}>
                <Location locationId={locationId} getCharacterIds={setCharacters} />

                <h3>{`${characters.length} ${characters.length === 1 ? 'Resident' : 'Residents'}`}</h3>
                <Suspense fallback={<Loader />}>
                    {!characters.length ? (
                        <p>No know residents</p>
                    ) : (
                        <CharactersFor
                            cacheKeys={{ locationId }}
                            characterIds={characters}
                            noFilterResultsText='No residents that match those filters.'
                        /> // [8]
                    )}
                </Suspense>
            </Suspense>
        </section>
    );
};
