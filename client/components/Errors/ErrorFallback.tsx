// ==========================================================================
// COMPONENTS / ERRORS / #FALLBACK
// ==========================================================================

/**
 * Imports
 * 1. Import react
 *
 */
import React from 'react';
import { RM } from '../../types';

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
    error: RM.FetchError;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}): React.ReactElement => {
    return (
        <section>
            <h1>Error!</h1>
            <p>{error.message}</p>
            <p>{error.code}</p>
            <button onClick={() => resetErrorBoundary()}>Try again</button>
        </section>
    );
};
