
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

  return url;
}

function searchResult(state = initialState, action) {
    switch (action.type) {
        case 'LISTING_LOAD':
            // Parse From Get
            var params = query.parse(window.location.search.slice(1));
            console.log(params);

            return {
                ...state,
                ...params,
                results: samples,
                count: samples.length,
                loading: false
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
                  keyword: action.payload
                }
            }

            return state;      

        case 'GRID_RELOAD':
            var newstate = {
                ...state,
                loading: true
            };

            var new_query = query.stringify(getCurrentQuery(newstate));
            history.push('/?' + new_query, newstate);

            return newstate;

        default:
            return state
    }
  }

  export default searchResult;