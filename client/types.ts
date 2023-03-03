// ==========================================================================
// #TYPES
// ==========================================================================

import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';

export namespace RM {
    export type episode = {
        id: number;
        name: string;
        air_date: string;
        episode: string;
        characters: string[];
        url: string;
        created: string;
    };

    export type character = {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        url: string;
        created: string;
    };

    export type location = {
        id: number;
        name: string;
        type: string;
        dimension: string;
        residents: string[];
        url: string;
        created: string;
    };

    export type info = {
        count: number;
        pages: number;
        next: null | string;
        prev: null | string;
    };

    export type props = {
        id: string;
    };

    export type filterProps = {
        selected?: string;
        label: string;
        data: {
            name: string;
            value: string;
        }[];
        searchParam: string;
        onFilterChange: SetURLSearchParams;
    };

    export type filterObjectProps = {
        selected?: string;
        label: string;
        data: {
            name: string;
            value: string;
        }[];
        searchParam: string;
    };

    export type paginationProps = {
        page: number;
        totalPages: number;
        prevPage: string | null;
        nextPage: string | null;
        onPageChange: SetURLSearchParams;
    };

    export type EpisodeProps = {
        episodeId: string | undefined;
        getCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
    };

    // https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx
    export type SetURLSearchParams = (
        nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit),
        navigateOpts?: NavigateOptions
    ) => void;
}
