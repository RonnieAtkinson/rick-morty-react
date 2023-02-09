// ==========================================================================
// COMPONENTS / #FILTERS
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import child components
 * 3. Import types
 *
 */
import React from 'react'; // [1]
import { Filter } from './Filter'; // [2]
import { RM } from '../types'; // [3]

/**
 * Component for creating filters from an array of objects.
 *
 * @param {object} props
 * @param {RM.filterprops[]} props.data An array of filter objects
 * @param {onFilterChange} props.onFilterChange A function that updates the url search params
 * @returns {React.ReactElement} React element
 * @example <Filters data={RM.filterprops[]} />
 *
 */
export const Filters = ({
    data,
    onFilterChange,
}: {
    data: RM.filterProps[];
    onFilterChange: RM.SetURLSearchParams;
}): React.ReactElement => {
    return (
        <div className='filters'>
            {data.map(filter => (
                <Filter
                    key={filter.label}
                    label={filter.label}
                    data={filter.data}
                    selected={filter.selected}
                    searchParam={filter.searchParam}
                    onFilterChange={onFilterChange}
                />
            ))}
        </div>
    );
};
