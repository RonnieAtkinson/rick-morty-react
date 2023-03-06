// ==========================================================================
// PAGES / EPISODES / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import page specific component
 * 3. Import child components
 *
 */
import React, { Suspense } from 'react'; // [1]
import { Episodes } from './Episodes'; // [2]
import { Loader } from '../../components'; // [3]

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
