// ==========================================================================
// UTILS / ERRORS / #FETCH ERROR
// ==========================================================================

/**
 * Custom error for fetching data.
 * @extends Error
 * @example
 * throw new FetchError('Message', 404);
 *
 */
export class FetchError extends Error {
    /**
     * @param {string} message
     * @param {number} code
     *
     */ /*
     *
     * 1. Set the name without having to hard code it.
     * 2. Restore prototype chain.
     * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
     *
     */
    constructor(message: string, public code: number) {
        super(message);
        this.name = new.target.name; // [1]
        Object.setPrototypeOf(this, new.target.prototype); // [2]
    }
}
