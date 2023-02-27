// ==========================================================================
// #INDEX
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react dom
 * 3. Import react router
 * 4. Import react query
 * 5. Import toast
 * 6. Import child components
 *
 */
import React from 'react'; // [1]
import ReactDOM from 'react-dom/client'; // [2]
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // [3]
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'; // [4]
import toast from 'react-hot-toast'; // [5]
import { Layout, Home, Episodes, Episode, Characters, Character, Locations, Location } from './components'; // [6]

/**
 * New react QueryClient instance.
 *
 */ /*
 *
 * Query cache
 * Define a new query cache with custom global callbacks
 * 1. On error show a toast notification
 * Gets the first query key, eg 'characters', 'episodes', etc,
 * # This notification will show when there is no response to cache
 * # Will only show a toast once per query
 * @see https://tkdodo.eu/blog/react-query-error-handling
 *
 * Options
 * 2. Set the stale time to 10 minutes
 * staleTime is the length of time before the data becomes stale.
 * staleTime default is 0, meaning data was always stale.
 * If data is stale, then fresh data gets fetched anytime the window refocuses, the component re-mounts, or the network reconnects.
 * Fresh data gets used from the cache without API calls.
 * @see https://tanstack.com/query/latest/docs/react/guides/important-defaults
 *
 * 3. Set the cache time to 15 minutes
 * cacheTime is the length of time before inactive data gets removed from the cache.
 * cacheTime default is 5 minutes.
 * cacheTime should be longer than staletime
 * @see https://tanstack.com/query/v4/docs/react/guides/caching
 *
 */
const queryClient = new QueryClient({
    // Query cache
    queryCache: new QueryCache({
        onError: (error, query) =>
            // toast.error(`Something went wrong QC: ${error.message} - Query ${query.queryKey[0]}`),
            toast.error(`Error fetching ${query.queryKey[0]}`), // [1]
    }),

    // Options
    defaultOptions: {
        queries: {
            staleTime: 10 * (60 * 10000), // [2]
            cacheTime: 15 * (60 * 10000), // [3]
            suspense: true,
        },
    },
});

/**
 *  Router object.
 * - The client side paths.
 * - The elements to render on those paths.
 *
 * `createBrowserRouter` uses the DOM History API to update the URL and manage the history stack
 * @see https://reactrouter.com/en/main/routers/create-browser-router
 *
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/episodes',
                element: <Episodes />,
            },
            {
                path: '/episodes/:episodeId',
                element: <Episode />,
            },
            {
                path: '/characters',
                element: <Characters />,
            },
            {
                path: '/characters/:characterId',
                element: <Character />,
            },
            {
                path: '/locations',
                element: <Locations />,
            },
            {
                path: '/locations/:locationId',
                element: <Location />,
            },
        ],
    },
]);

/**
 * DOM
 *
 */
const container = document.getElementById('app');

if (!container) {
    throw new Error('#app not found');
}

ReactDOM.createRoot(container).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
