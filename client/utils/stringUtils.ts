// ==========================================================================
// UTILS / #STRING UTILS
// ==========================================================================

/**
 * String util
 *
 */
export class StringUtil {
    public static instance: StringUtil = new StringUtil();

    /**
     * Gets the part of the url after the last '/'.
     *
     * @param {string} url
     * @returns {string}
     * @example
     * // Returns '24'
     * getLastUrlPart('https://rickandmortyapi.com/api/character/24');
     *
     */
    public getLastUrlPart(url: string): string {
        return url.substring(url.lastIndexOf('/') + 1);
    }

    /**
     * Converts a string to Title case.
     * - The first letter is capitalized.
     * - The rest of the string is set to lowercase.
     *
     * @param {string} str The string to title case.
     * @returns {string}
     * @example
     * // Returns Hello world
     * toTitleCase('hello world');
     *
     */
    public toTitleCase(str: string): string {
        return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
    }
}
