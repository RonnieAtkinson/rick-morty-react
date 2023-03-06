// ==========================================================================
// PAGES / PAGE NOT FOUND / #INDEX
// ==========================================================================

/**
 * Imports
 * 1. Import react
 *
 */
import React from 'react';

/**
 * Page not found component
 *
 * @returns {React.ReactElement}
 * @example
 * <PageNotFound />
 *
 */
export const PageNotFound = (): React.ReactElement => {
    // Render component
    return (
        <section>
            <h1>Page not found</h1>
            <h2>404</h2>
        </section>
    );
};
