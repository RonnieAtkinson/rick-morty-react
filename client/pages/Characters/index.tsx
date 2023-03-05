// ==========================================================================
// PAGES / CHARACACTERS / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import child components
 *
 */
import React, { Suspense } from 'react'; // [1]
import { Characters, Loader } from '../../components'; // [2]

/**
 * Characters page component
 *
 * @returns {React.ReactElement} React element
 * @example <PageCharacters />
 *
 */
export const PageCharacters = (): React.ReactElement => {
    // Return component
    return (
        <section>
            <h1>Characters</h1>
            <Suspense fallback={<Loader />}>
                <Characters />
            </Suspense>
        </section>
    );
};
