// ==========================================================================
// COMPONENTS / ERRORS / #FALLBACK
// ==========================================================================

/**
 * Imports
 * 1. Import react
 *
 */
import React from 'react';

/**
 * Fallback error component
 *
 * @returns {React.ReactElement}
 * @example
 * <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
 *      <ComponentThatMayError />
 * </ErrorBoundary>
 *
 */
export const ErrorFallback = ({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}) => {
    return (
        <section>
            <h1>Error!</h1>
            <p>{error.message}</p>
            <button onClick={() => resetErrorBoundary()}>Try again</button>
        </section>
    );
};
