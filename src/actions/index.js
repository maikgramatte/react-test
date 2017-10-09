export const setViewMode = (view_mode) => (
    { type: 'SET_VIEWMODE', payload: view_mode }
);

export const loadListings = (indicator = true) => (
    { 
        type: 'LISTING_LOAD',
        payload: indicator, 
    }
)

export const gridChangeSort = (sort) => (
    { 
        type: 'GRID_SET_SORT', 
        payload: sort 
    }
)

export const gridReload = (new_data) => (
    { 
        type: 'GRID_RELOAD',
        payload: new_data 
    }
)

export const gridSetData = (data) => (
    { 
        type: 'GRID_SET_RESULTS',
        payload: data 
    }
)

export const gridSearchKeyword = (keyword) => (
    { 
        type: 'GRID_SET_KEYWORD',
        payload: keyword 
    }
)


export const gridSetPage = (page) => (
    { 
        type: 'GRID_SET_PAGE',
        payload: page 
    }
)