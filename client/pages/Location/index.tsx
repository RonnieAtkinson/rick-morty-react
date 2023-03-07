// ==========================================================================
// PAGES / LOCATION / #INDEX
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
import { LocationInfo } from './LocationInfo'; // [3]
import { CharactersFor, Loader } from '../../components'; // [4]

/**
 * Location page component
 *
 * @returns {React.ReactElement} React element
 * @example
 * <PageLocation />
 *
 *
 */ /*
 *
 * URL Params
 * Key value pairs of the url params.
 * 1. Get the location id from the url.
 *
 * State
 * 2. State for the character ids, initially an empty array.
 * Updated with character ids for this location from LocationInfo.
 *
 * Return component
 *
 */
export const PageLocation = (): React.ReactElement => {
    // URL params
    const { locationId } = useParams(); // [1]

    // State
    const [characters, setCharacters] = useState([]); // [2]

    // Return component
    return (
        <section>
            <h1>Location</h1>
            <Suspense fallback={<Loader />}>
                <LocationInfo locationId={locationId} onData={setCharacters} />

                <h3>{`${characters.length} ${characters.length === 1 ? 'Resident' : 'Residents'}`}</h3>
                <Suspense fallback={<Loader />}>
                    {!characters.length ? (
                        <p>No know residents</p>
                    ) : (
                        <CharactersFor
                            cacheKeys={{ locationId }}
                            characterIds={characters}
                            noFilterResultsText='No residents that match those filters.'
                        />
                    )}
                </Suspense>
            </Suspense>
        </section>
    );
};
