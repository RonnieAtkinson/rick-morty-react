// ==========================================================================
// PAGES / EPISODES / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import child components
 *
 */
import React, { Suspense } from 'react'; // [1]
import { Episodes, Loader } from '../../components'; // [2]

/**
 * Episodes page component
 *
 */
export const PageEpisodes = () => {
    // Return component
    return (
        <section>
            <h1>Episodes</h1>
            <Suspense fallback={<Loader />}>
                <Episodes />
            </Suspense>
        </section>
    );
};
