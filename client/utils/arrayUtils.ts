// ==========================================================================
// UTILS / #ARRAY UTILS
// ==========================================================================

/**
 * Imports
 *
 * 1. Import utils
 * 2. Import types
 *
 */
import { StringUtil } from './'; // [1]
import { RM } from '../types'; // [2]

/**
 * Array util
 *
 */
export class ArrayUtil {
    public static instance: ArrayUtil = new ArrayUtil();

    /**
     * Converts an object to an array containing the object.
     *
     * @param {object | object[]} data - An object or an array of objects.
     *
     * @example
     * // Adds an object to an array.
     * // Returns [{id: 1}];
     * const data = {id: 1};
     * getArrayFor(data);
     *
     * @example
     * // If an array is passed returns untouched.
     * // Returns [{id: 1}, {id: 2}];
     * const data = [{id: 1}, {id: 2}];
     * getArrayFor(data);
     *
     * @example
     * // If data is not an object or array returns an empty array.
     * // Returns [];
     * const data = 'id1';
     * getArrayFor(data);
     *
     * @returns {any[]} Returns an array.
     *
     */ /*
     *
     * 1. If data is already an array return it. data[]
     * 2. If data is an object add it to an array and return the array. data[]
     * 3. If data is neither an array or an object return an empty array. []
     *
     */
    public getArrayFor(data: any | any[]): any[] {
        if (Array.isArray(data)) {
            return data; // [1]
        } else if (typeof data == 'object') {
            return [data]; // [2]
        } else {
            return []; // [3]
        }
    }

    /**
     * Creates a sorted array of filter objects without duplicate entries from an array of objects.
     *
     * @param {string} key - A key from the objects for which the associated values will be used as the filters.
     * @param {object[]} data - An array of objects to grab the filters from.
     * @param {} customSort - An optional custom sort function. If omitted the sort order is ascending.
     *
     * @example
     * // Simple example - No duplicates are added.
     * // Returns [{name: 'Female', value: 'female'}, {name: 'Male': value: 'male'}];
     * const data = [{gender: male}, {gender: male}, {gender: female}]
     * getFilterValuesFor('gender', data);
     *
     * @example
     * // If no custom sort function is provided the order is ascending.
     * // Returns [{name: 'Backlog', value: 'backlog'}, {name: 'Done', value: 'done'}, {name: 'Todo', value:'todo'}];
     * const data = [{id: 1, status: todo}, {id: 2, status: done}, {id: 3, status: todo}, {id: 4, status: backlog}]
     * getFilterValuesFor('status', data);
     *
     * @example
     * // Custom sort uses Array.sort method
     * // Sort descending
     * // Returns [{name: 'Female' , value: 'female'}, {name: 'Male', value: 'male'}];
     * const data = [{gender: 'female', {gender: 'male'}}]
     * getFilterValuesFor('gender', data, (a, b) => b.name.localeCompare(a.name))
     *
     * @returns {{name: string, value: string}[]}
     *
     */ /*
     *
     * Array of values
     * 1. Create an array from the unique values of `key` and sort by `customSort`.
     *
     * Return an array of objects
     * {name: string, value: string}[]
     *
     */
    public getFilterValuesFor(
        key: string,
        data: object[],
        customSort?: (a: string, b: string) => number
    ): { name: string; value: string }[] {
        // Array of values
        const values = Array.from(new Set(data.map(obj => obj[key]))).sort(customSort); // [1]

        // Return an array of objects
        return values.map(value => ({
            name: StringUtil.instance.toTitleCase(value),
            value: value.toLowerCase(),
        }));
    }

    /**
     * Sorts an array of strings using the indexes from a referenced array.
     * - Pass to an array sort method.
     * - Values are case insensitive.
     *
     * @param {string[]} reference - A pre-ordered array of strings used as reference.
     * @example
     * // Returns ['Female', 'Male', 'Unknown']
     * const reference = ['Female', 'Male', 'Genderless', 'Unknown'];
     * const originalArray = ['Male', 'Female', 'Unknown'];
     * originalArray.sort(sortStringsBy(reference))
     *
     */ /*
     *
     * 1. Get the index of `a` from the `reference` array.
     * 2. Get the index of `b` from the `reference` array.
     * 3. Sort them.
     *
     */
    public sortStringsBy = (reference: string[]) => {
        return (a: string, b: string) => {
            //
            const first = reference.findIndex(element => element.toLowerCase() === a.toLowerCase()); // [1]
            const second = reference.findIndex(element => element.toLowerCase() === b.toLowerCase()); // [2]
            return first - second; // [3]
        };
    };

    /**
     * Sorts an array of strings using the indexes from an array of objects.
     * - Pass to an array sort method.
     * - Values are case insensitive.
     *
     * @param {object[]} reference - An array of objects whos order are used as reference.
     * @param {string} key - A key in the objects for which the associated values match the values in the array of strings.
     * @example
     *
     */ /*
     *
     * 1. Get the index of `a` from `reference` where the value of `key` matches the value of `a`.
     * 2. Get the index of `b` from `reference` where the value of `key` matches the value of `b`.
     * 3. Sort them.
     *
     */
    public sortStringsByObjectsIn = (reference: object[], key: string) => {
        return (a: string, b: string) => {
            //
            const first = reference.findIndex(element => element[key] === StringUtil.instance.toTitleCase(a)); // [1]
            const second = reference.findIndex(
                element => element[key] === StringUtil.instance.toTitleCase(b)
            ); // [2]
            return first - second; // [3]
        };
    };

    /**
     *
     * Groups episodes by season number.
     *
     * @param {RM.episode[]} data
     * @returns {{number: string, episodes: RM.episode[]}[]} Episodes grouped by season number
     *
     */ /*
     *
     * 1. Get the season number from the episode code
     *    # Theres only 5 seasons so getting the 3rd character in the string works for now.
     *    # String format is S01E01 where the 3rd character is the season number.
     *
     * Return an array created from the reduced data
     *
     */
    public groupBySeasons = (data: RM.episode[]): { number: string; episodes: RM.episode[] }[] => {
        // Reduce the data
        const map = data.reduce((acc, obj) => {
            const season = obj.episode.charAt(2); // [1]
            const key = acc[season] || (acc[season] = []);
            key.push(obj);
            return acc;
        }, {});

        // Return an array created from the reduced data
        return Object.keys(map).map(el => ({
            number: el,
            episodes: map[el] as RM.episode[],
        }));
    };
}
