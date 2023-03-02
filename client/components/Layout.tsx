// ==========================================================================
// COMPONENTS / #LAYOUT
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import toast
 * 4. Import react query
 * 5. Import Error boundary
 * 6. Import child components
 *
 */
import React, { Fragment, Suspense } from 'react'; // [1]
import { Link, Outlet } from 'react-router-dom'; // [2]
import { Toaster } from 'react-hot-toast'; // [3]
import { useQueryErrorResetBoundary } from '@tanstack/react-query'; // [4]
import { ErrorBoundary } from 'react-error-boundary'; // [5]
import { GlobalLoadingSpinner, Loader, ErrorFallback } from './'; // [6]

/**
 * Layout component
 *
 * @returns {React.ReactElement}
 * @example
 * <Layout />
 *
 */
export const Layout = (): React.ReactElement => {
    const { reset } = useQueryErrorResetBoundary();

    const myErrorHandler = (error: Error, info: { componentStack: string }) => {
        console.log('Error', error);
    };

    return (
        <Fragment>
            <Toaster position='bottom-right' />
            <nav>
                <Link to={`/`}>
                    <button>Home</button>
                </Link>

                <Link to={`/episodes`}>
                    <button>Episodes</button>
                </Link>

                <Link to={`/characters`}>
                    <button>Characters</button>
                </Link>

                <Link to={`/locations`}>
                    <button>Locations</button>
                </Link>
            </nav>

            <main>
                <ErrorBoundary onReset={reset} onError={myErrorHandler} FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </main>

            {/* <GlobalLoadingSpinner /> */}
        </Fragment>
    );
};
