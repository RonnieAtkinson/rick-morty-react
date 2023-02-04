// ==========================================================================
// SERVICES / #RICK MORTY SERVICE
// ==========================================================================

/**
 * Imports
 *
 * 1. Import types
 *
 */
import { RM } from '../types';

/**
 * Rick Morty Service
 *
 */
export class RickMortyService {
    public static instance: RickMortyService = new RickMortyService();

    /**
     * Fetch data
     *
     * @param {string} query
     *
     */
    private async fetchData(query: string) {
        const response = await fetch(`https://rickandmortyapi.com/api/${query}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    }

    /**
     * Get all episodes
     *
     * @param {number} page
     * @returns {Promise<{info: RM.info; results: RM.episode[]}>}
     * @see https://rickandmortyapi.com/documentation/#get-all-episodes
     *
     */
    public async getEpisodes(
        page?: number,
        season?: string
    ): Promise<{ info: RM.info; results: RM.episode[] }> {
        const query = `episode?page=${page}&episode=${season}`;
        return await this.fetchData(query);
    }

    /**
     * Get single episode
     *
     * @param {string} episodeId
     * @returns {Promise<RM.episode>}
     * @see https://rickandmortyapi.com/documentation/#get-a-single-episode
     *
     */
    public async getEpisode(episodeId: string = '1'): Promise<RM.episode> {
        const query = `episode/${episodeId}`;
        return await this.fetchData(query);
    }

    /**
     * Get multiple episodes
     *
     * @param {string[]} episodeIds
     * @returns {Promise<RM.episode | RM.episode[]>}
     * @see https://rickandmortyapi.com/documentation/#get-multiple-episodes
     *
     */
    public async getMultipleEpisodes(episodeIds: string[]): Promise<RM.episode | RM.episode[]> {
        const query = `episode/${episodeIds}`;
        return await this.fetchData(query);
    }

    /**
     * Get all characters
     *
     * @param {number} page
     * @returns {Promise<{info: RM.info; results: RM.character[]}>}
     * @see https://rickandmortyapi.com/documentation/#get-all-characters
     *
     */
    public async getCharacters(
        page?: number,
        status?: string,
        gender?: string
    ): Promise<{ info: RM.info; results: RM.character[] }> {
        const query = `character?page=${page}&status=${status}&gender=${gender}`;
        return await this.fetchData(query);
    }

    /**
     * Get single character
     *
     * @param {string} characterId
     * @returns {Promise<RM.character>}
     * @see https://rickandmortyapi.com/documentation/#get-a-single-character
     *
     */
    public async getCharacter(characterId: string = '1'): Promise<RM.character> {
        const query = `character/${characterId}`;
        return await this.fetchData(query);
    }

    /**
     * Get multiple characters
     *
     * @param {string[]} characterIds
     * @returns {Promise<RM.character[]>}
     * @see https://rickandmortyapi.com/documentation/#get-multiple-characters
     *
     */
    public async getMultipleCharacters(characterIds: string[]): Promise<RM.character[]> {
        const query = `character/${characterIds}`;
        return await this.fetchData(query);
    }

    /**
     * Get all locations
     *
     * @param {number} page
     * @returns {Promise<{info: RM.info; results: RM.location[]}>}
     * @see https://rickandmortyapi.com/documentation/#get-all-locations
     *
     */
    public async getLocations(page?: number): Promise<{ info: RM.info; results: RM.location[] }> {
        const query = `location?page=${page}`;
        return await this.fetchData(query);
    }

    /**
     * Get single locations
     *
     * @param {string} locationId
     * @returns {Promise<RM.location>}
     * @see https://rickandmortyapi.com/documentation/#get-a-single-location
     *
     */
    public async getLocation(locationId: string = '1'): Promise<RM.location> {
        const query = `location/${locationId}`;
        return await this.fetchData(query);
    }

    /**
     * Get multiple characters
     *
     * @param {string[]} locationIds
     * @returns {Promise<RM.location[]>}
     * @see https://rickandmortyapi.com/documentation/#get-multiple-locations
     *
     */
    public async getMultipleLocations(locationIds: string[]): Promise<RM.location[]> {
        const query = `location/${locationIds}`;
        return await this.fetchData(query);
    }
}
