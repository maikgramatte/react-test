export const setViewMode = (view_mode) => (
    { type: 'SET_VIEWMODE', payload: view_mode }
);

export const loadListings = () => (
    { type: 'LISTING_LOAD' }
)

export const gridChangeSort = (sort) => (
    { 
        type: 'GRID_SET_SORT', 
        payload: sort 
    }
)

export const gridReload = () => (
    { 
        type: 'GRID_RELOAD'
    }
)

export const gridSearchKeyword = (keyword) => (
    { 
        type: 'GRID_SET_KEYWORD',
        payload: keyword 
    }
)