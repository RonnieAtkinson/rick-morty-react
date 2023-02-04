// ==========================================================================
// COMPONENTS / #FILTER
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import types
 *
 */
import React from 'react'; // [1]
import { RM } from '../types'; // [2]

/**
 * Component for a single filter.
 *
 * @param {object} props
 * @param {string} props.label The name of the filter
 * @param {object[]} props.data `Name`s and `value`s for the options tags
 * @param {string} props.selected The currently selected filter, used for two way binding
 * @param {searchParam} props.searchParam The url search param for this filter
 * @param {onFilterChange} props.onFilterChange Function callback on filter change
 * @returns {React.ReactElement} React element
 * @example
 * <Filter
 *      key={filter.id}
 *      label={filter.label}
 *      data={filter.data}
 *      selected={filter.selected}
 *      searchParam={filter.searchParam}
 *      onFilterChange={filter.onFilterChange}
 * />
 *
 */ /*
 *
 * Handler
 * 1. Filter change callback
 *
 * Return component
 *
 */
export const Filter = ({
    label,
    data,
    selected,
    searchParam,
    onFilterChange,
}: RM.filterProps): React.ReactElement => {
    // Handler
    const filterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(searchParam, event.target.value); // [1]
    };

    // Return component
    return (
        <div>
            <label>{label}</label>
            <select value={selected} onChange={filterChangeHandler}>
                {data.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
