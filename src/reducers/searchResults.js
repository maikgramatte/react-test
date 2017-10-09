
import query from 'qs';
import createHistory from 'history/createBrowserHistory'
import samples from '../data/sample_data';
const history = createHistory();

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location);
});

const initialState = {
    // Title of the Collection
    title: 'Comedy Film',
    initialized: true,
    loading: true,
    results: [],
    count: 0,
    keyword: '',
    viewmode: 'default',
    sort: 'default',
    url: null,
    page: 0
}

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

  return url;
}

function searchResult(state = initialState, action) {
    switch (action.type) {
        case 'LISTING_LOAD':
            // Parse From Get
            var params = query.parse(window.location.search.slice(1));
            
            return {
                ...state,
                ...params,
                url: params,
                loading: true
            }

        case 'SET_VIEWMODE':
            if(action.payload !== state.viewmode) {
                return {
                  ...state,
                  viewmode: action.payload
                }
            }

            return state;    
        
        case 'GRID_SET_SORT':
            if(action.payload !== state.sort) {
                return {
                  ...state,
                  sort: action.payload
                }
            }

            return state;   
            
        case 'GRID_SET_KEYWORD':
            if(action.payload !== state.keyword) {
                return {
                  ...state,
                  page: 0,
                  keyword: action.payload
                }
            }

            return state;      
        
        case 'GRID_SET_RESULTS':
            var newstate = {
                ...state,
                results: action.payload.items,
                count: action.payload.count,
                loading: false
            };
            
        return newstate;
            
        case 'GRID_SET_PAGE':
            var newstate = {
                ...state,
                page: action.payload
             };

             return newstate;
        break;     
     
        case 'GRID_RELOAD':
            var newstate = {
                ...state,
                loading: action.payload
            };

            newstate.url = getCurrentQuery(newstate);

            var new_query = query.stringify(newstate.url);
            history.push('/?' + new_query, newstate);

            return newstate;

        default:
            return state
    }
  }

  export default searchResult;