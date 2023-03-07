// ==========================================================================
// PAGES / LOCATIONS / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import page specific component
 * 3. Import child components
 *
 */
import React, { Suspense } from 'react'; // [1]
import { Locations } from './Locations'; // [2]
import { Loader } from '../../components'; // [3]

/**
 * Locations page component
 *
 * @returns {React.ReactElement} React element
 * @example
 * <PageLocations />
 *
 */
export const PageLocations = (): React.ReactElement => {
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
