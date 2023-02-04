// ==========================================================================
// COMPONENTS / #EPISODE
// ==========================================================================

/**
 * Imports
 *
 * 1. Import react
 * 2. Import react router
 * 3. Import utils
 *
 */
import React, { Fragment } from 'react'; // [1]
import { Link } from 'react-router-dom'; // [2]
import { StringUtil } from '../utils'; // [3]

/**
 * Component for generating a single location link.
 *
 * @param {object} props
 * @param {string} props.name The location name
 * @param {string} props.url The location url
 * @returns {React.ReactElement} React element
 * @example
 * // Returns <Link to='/locations/1>Earth</Link>
 * <LocationLink name='Earth' url='https://rickandmortyapi.com/api/location/1' />
 *
 */ /*
 *
 * If the location has no `url`:
 * 1. Just show the location `name`.
 *
 * If the location does have a `url`:
 * 2. Get location id from the url.
 * A location url looks like 'https://rickandmortyapi.com/api/location/24'
 * The `getLastUrlPart` method returns '24' for the above url.
 * 2. Return the location link.
 *
 */
export const LocationLink = ({
    name,
    url,
}: {
    name: string;
    url?: string | undefined;
}): React.ReactElement => {
    if (!url) return <Fragment>{name}</Fragment>; // [1]
    const locationId = StringUtil.instance.getLastUrlPart(url); // [2]
    return <Link to={`/locations/${locationId}`}>{name}</Link>; // [3]
};
