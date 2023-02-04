// ==========================================================================
// COMPONENTS / #LAYOUT
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import toast
 * 4. Import child components
 *
 */
import React, { Fragment } from 'react'; // [1]
import { Link, Outlet } from 'react-router-dom'; // [2]
import { Toaster } from 'react-hot-toast'; // [3]
import { GlobalLoadingSpinner } from './'; // [4]

/**
 * Layout component
 *
 * @returns {React.ReactElement}
 * @example
 * <Layout />
 *
 */
export const Layout = (): React.ReactElement => {
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
                <Outlet />
            </main>

            <GlobalLoadingSpinner />
        </Fragment>
    );
};
