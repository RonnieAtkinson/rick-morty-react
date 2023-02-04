// ==========================================================================
// #OPTIONS
// ==========================================================================

export const options = {
    filters: {
        gender: {
            label: 'Gender',
            searchParam: 'gender',
            data: [
                { name: 'All', value: '' },
                { name: 'Female', value: 'female' },
                { name: 'Male', value: 'male' },
                { name: 'Genderless', value: 'genderless' },
                { name: 'Unknown', value: 'unknown' },
            ],
        },
        status: {
            label: 'Status',
            searchParam: 'status',
            data: [
                { name: 'All', value: '' },
                { name: 'Alive', value: 'alive' },
                { name: 'Dead', value: 'dead' },
                { name: 'Unknown', value: 'unknown' },
            ],
        },
        season: {
            label: 'Season',
            searchParam: 'season',
            data: [
                { name: 'All', value: '' },
                { name: 'Season 1', value: 's01' },
                { name: 'Season 2', value: 's02' },
                { name: 'Season 3', value: 's03' },
                { name: 'Season 4', value: 's04' },
                { name: 'Season 5', value: 's05' },
            ],
        },
    },
    defaultText: {
        noFilterResults: 'Nothing found',
    },
};
