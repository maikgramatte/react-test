import 'whatwg-fetch';
import query from 'qs';
import Scroll from 'react-scroll';
const scroll  = Scroll.animateScroll;

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

export const gridAddSearchFacet = (data) => {
    return(dispatch, getState)=> {
        dispatch({
            type:'GRID_SEARCH_ADD_FACET',
            payload: data
        });

        scroll.scrollToTop();

        dispatch({
            type:'GRID_UPDATE_STORE',
            payload: {
                'loading': true    
            }
        });

        dispatch(loadData());
    }    
}

export const gridRemoveSearchFacet = (facet) => {
    return(dispatch, getState)=> {
        dispatch({
            type:'GRID_SEARCH_REMOVE_FACET',
            payload: facet
        });

        scroll.scrollToTop();

        dispatch({
            type:'GRID_UPDATE_STORE',
            payload: {
                'loading': true    
            }
        });

        dispatch(loadData());
    }    
}


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

                if(result.error) {
                    return dispatch({
                        type:'GRID_UPDATE_STORE',
                        payload: {
                            httpError: result.error,
                        }
                    })
                }

                return dispatch({
                    type:'GRID_UPDATE_STORE',
                    payload: {
                        results: result.items,
                        facet_data: result.facets,
                        count: result.count,
                        lazyload: false,
                        loading: false,
                        httpError: false,
                        initialized: true,
                        timer: result.timer,
                    }
                })
            }, function(error) {
                return dispatch({
                    type:'GRID_UPDATE_STORE',
                    payload: {
                        httpError: error,
                    }
                })
            })
    }
}    
