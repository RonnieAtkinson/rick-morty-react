// ==========================================================================
// COMPONENTS / #LOCATION LIST
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import types
 *
 */
import React from 'react'; // [1]
import { Link } from 'react-router-dom'; // [2]
import { RM } from '../types'; // [3]

/**
 * Component for displaying a list of location links.
 *
 * @param {object} props
 * @param {RM.location[]} props.locations An array of location objects
 * @returns {React.ReactElement} React element
 * @example
 * <LocationList locations={data} />
 *
 */
export const LocationList = ({ locations }: { locations: RM.location[] }): React.ReactElement => {
    return (
        <ul className='location-list'>
            {locations.map(location => (
                <li key={location.id}>
                    <Link to={`/locations/${location.id}`}>{location.name}</Link> ({location.residents.length}{' '}
                    {location.residents.length === 1 ? 'Resident' : 'Residents'})
                </li>
            ))}
        </ul>
    );
};
