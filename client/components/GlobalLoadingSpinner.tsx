// ==========================================================================
// COMPONENTS / #GLOBAL LOADING INDICATOR
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react query
 *
 */
import React from 'react'; // [1]
import { useIsFetching } from '@tanstack/react-query'; // [2]

/**
 *
 * Component for showing JSX if react query is fetching data in the background.
 *
 * React query `keepPreviousData` is set to `true` so the UI is stale until the new data has been fetched.
 * Using this component prevents a stale UI.
 *
 * @returns {React.ReactElement | null} React element or returns null if no data is being fetched.
 * @example
 * <GlobalLoadingSpinner />
 *
 */
export const GlobalLoadingSpinner = (): React.ReactElement | null => {
    const isFetching = useIsFetching();
    return isFetching ? <div>Queries are fetching in the background...</div> : null;
};
