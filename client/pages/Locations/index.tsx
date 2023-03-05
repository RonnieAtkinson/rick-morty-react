// ==========================================================================
// PAGES / LOCATIONS / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import child components
 *
 */
import React, { Suspense } from 'react'; // [1]
import { Locations, Loader } from '../../components'; // [2]

/**
 * Locations page component
 *
 */
export const PageLocations = () => {
    // Return component
    return (
        <section>
            <h1>Locations</h1>
            <Suspense fallback={<Loader />}>
                <Locations />
            </Suspense>
        </section>
    );
};
