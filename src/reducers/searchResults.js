import query from 'qs';
import createHistory from 'history/createBrowserHistory'
import initialState from '../data/sample_data';
const history = createHistory();

const SLIT_FACET_URL = '!';

// Listen for changes to the current location.
//const unlisten = history.listen((location, action) => {
  // location is an object like window.location
//  console.log(action, location.pathname, location);
//});


function getCurrentQuery(state) {
  var url = {};

  if(state.viewmode !== 'default') {
    url.viewmode = state.viewmode;
  }

  if(state.keyword !== '') {
    url.keyword = state.keyword;
  }

  if(state.sort !== 'default') {
    url.sort = state.sort;
  }

  if(state.page !== 0) {
    url.page = state.page;
  }

  if(state.perpage !== 20) {
    url.perpage = state.perpage;
  }

  if(state.facets.length > 0) {
    url.f = [];
    state.facets.map(function(facet){
        url.f.push(facet.type + SLIT_FACET_URL + facet.label);       
        return true;  
    });
  }

  return url;
}

function searchResult(state = initialState, action) {

    console.log(action);

    switch (action.type) {
        case 'LISTING_LOAD':
            // Parse From Get
            var params = query.parse(window.location.search.slice(1));
            console.log(params);

            var facets = [];

            if(params.f) {
                params.f.map(function(item){
                    var res = item.split(SLIT_FACET_URL);   
                    facets.push({
                        type: res[0],
                        label: res[1]    
                    })

                    return true;
                });
            }
            
            return {
                ...state,
                ...params,
                facets: facets,
                url: params,
                loading: true
            }
        
        case 'GRID_SEARCH_REMOVE_FACET':
        
            var facetsCurrentSearch = [];
            state.facets.map(function(item){
                if(item != action.payload) {
                    facetsCurrentSearch.push(item);    
                }

                return true;
            });    

            return {
                ...state,
                facets: facetsCurrentSearch
            }

        case 'GRID_SEARCH_ADD_FACET':
            
            var facetsCurrent = state.facets;
            facetsCurrent.push(action.payload);    

            return {
                ...state,
                facets: facetsCurrent,
                loading: true
            };

        case 'SET_VIEWMODE':
            if(action.payload !== state.viewmode) {
                return {
                  ...state,
                  viewmode: action.payload
                }
            }

            return state;    
       
        case 'GRID_SET_RESULTS':
            return {
                ...state,
                results: action.payload.items,
                count: action.payload.count,
                loading: false
            };
            
       
        case 'GRID_UPDATE_STORE':
            var newstate = {
                ...state,
                ...action.payload
            };

            newstate.url = getCurrentQuery(newstate);
            
            var new_query = query.stringify(newstate.url);
            history.push('/?' + new_query);

            return newstate;
     
        case 'GRID_RELOAD':
            var newstateReload = {
                ...state,
                loading: action.payload
            };

            newstateReload.url = getCurrentQuery(newstateReload);
            history.push('/?' + query.stringify(newstateReload.url), newstateReload);

            return newstateReload;

        default:
            return state
    }
  }

  export default searchResult;