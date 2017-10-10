import 'whatwg-fetch';
import query from 'qs';

export const setViewMode = (view_mode) => (
    { 
        type: 'SET_VIEWMODE', 
        payload: view_mode,
    }
);

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

export const gridSetPage = (page) => (
    { 
        type: 'GRID_SET_PAGE',
        payload: page 
    }
)

export const gridSetPerPage = (perpage) => (
    { 
        type: 'GRID_SET_PAGE',
        payload: perpage 
    }
)

export const lazrReactGridUpdateStoreData = (data) => (
    { 
        type: 'GRID_UPDATE_STORE',
        payload: data 
    }
);

export const gridAddSearchFacet = (data) => (
    { 
        type: 'GRID_SEARCH_ADD_FACET',
        payload: data
    }
);

export const lazrReactGridInitialize = () => {
    return(dispatch, getState) => {
        dispatch({
            type:'LISTING_LOAD',
            payload: null,
        });
    }
}

export const loadData = () => {
    return(dispatch, getState)=> {
        const state = getState();

        console.log('State from loadData', state.search_results.url);

        return fetch('http://pharosui.maik/react.json?' + query.stringify(state.search_results.url), {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }})    
            .then((response) => {
                return response.json()
            }).then((result) => {
                return dispatch({
                    type:'GRID_UPDATE_STORE',
                    payload: {
                        results: result.items,
                        count: result.count,
                        lazyload: false,
                        loading: false,
                    }
                })
            })
    }
}    
