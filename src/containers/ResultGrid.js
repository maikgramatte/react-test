import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader, Segment } from 'semantic-ui-react'
import * as actionCreators from "../actions/"
import Teaser from '../components/Teasers/Teaser';
import Listing from '../components/Teasers/Listing';
import NoResults from '../components/SearchResult/NoResults';
import ViewModeSwitcher from '../components/ViewModeSwitcher';
import SortSwitcher from '../components/SortSwitcher';
import Header from '../components/Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GridPager from '../components/Grid/GridPager';
import GridPerPage from '../components/Grid/Navigation/GridPerPage';


class ResultGrid extends Component {

  setViewMode(viewMode) {
    this.props.setViewMode(viewMode); 
  }

  setSort(sort) {
    this.updateStoreData({
        sort: sort
    }); 
  }

  componentDidMount() {
    this.props.lazrReactGridInitialize();
    this.props.loadData();
  }

  updatePager(page) {
    this.updateStoreData({
        page: page
    }); 
  }

  setKeyword(keywords) {
    this.updateStoreData({
        keyword: keywords
    });
  }

  updateStoreData(data) {
    this.props.lazrReactGridUpdateStoreData({
        ...data,
        loading: true
    });
    this.props.loadData();
  }

  renderLoadingState() {

    if(!this.props.search.loading) {
        return null;
    }

    return (
        <Segment className="content-loader">
            <Dimmer inverted active>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        </Segment>
    )
  }

  noResults() {
    if(!this.props.search.loading && this.props.search.count === 0) {
        return (
            <NoResults />
        );
    }
  }

  renderResults() {
    if(this.props.search.count === 0) {
        return null;
    }

    var items;
    const viewmode = this.props.search.viewmode;

    if(viewmode === 'default') {
        items = this.props.search.results.map(item => <Teaser key={item.id} item={item} />)
        items = <Grid doubling stackable centered columns={6}>{items}</Grid>;
    }
    else {
        items = this.props.search.results.map(item => <Listing key={item.id} item={item} />)
    }

    return (
        <ReactCSSTransitionGroup 
            transitionName="slide-in-out"
            transitionAppear={true}
            transitionAppearTimeout={500}
            component="div"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <div key={this.props.search.viewmode}>
                    <ReactCSSTransitionGroup 
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={1500}
                        component="div"
                        className="five column row"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                            {items}
                    </ReactCSSTransitionGroup>    
            </div>
        </ReactCSSTransitionGroup>   
    );
  }

  render() {
    if(!this.props.search) {        
      return (
        <Segment>
           Loading
        </Segment>    
      );
    }

     
    return (
        <div>
            <div className="image-banner">
                Comics in the 17th Century
              </div>  
          <Segment data-vm={ this.props.search.viewmode }>
              <Header 
                  count={this.props.search.count} 
                  keyword={this.props.search.keyword} 
                  facets={this.props.search.facets}
                  title={this.props.search.title} 
                  onChangeSearch={(keyword) => this.setKeyword(keyword)} 
              />
              <hr style={{clear: 'both'}}/>
              
              <div className="ui stackable three column grid">
                  <div className="column">
                    Show Filters
                  </div>    
                  <div className="column centered">
                      <ViewModeSwitcher 
                      viewmode={ this.props.search.viewmode } 
                      setViewMode={(viewmode) => this.setViewMode(viewmode)} 
                  />
                  </div>   
                  <div className="column">
                      <SortSwitcher 
                          value={ this.props.search.sort }
                          onSortChange={(sort) => this.setSort(sort)} 
                      />
                  </div>   
              </div>    

              {this.renderLoadingState()}    
              {this.renderResults()}
              {this.noResults()}

              {!this.props.search.lazyload && !this.props.search.loading &&
                    <div className="text-center" id="grid-bottom-element">
                        <GridPerPage 
                            onChange={(value) => this.updateStoreData({
                                lazyload: true, 
                                perpage: value, 
                                page: 0,
                            })} 
                            value={this.props.search.perpage} 
                            page={this.props.search.page} 
                        />
                        <GridPager 
                            current={this.props.search.page} 
                            count={this.props.search.count} 
                            perpage={this.props.search.perpage} 
                            setPage={(new_page)=>this.updatePager(new_page)} 
                        />
                    </div>
                }    

                {this.props.search.lazyload &&
                    <Segment className="content-loader">
                        <Dimmer inverted active>
                            <Loader inverted>Loading more items</Loader>
                        </Dimmer>
                    </Segment>
                }  


          </Segment>
          </div>
      );
  }
}

const mapStateToProps = state => ({
    search: state.search_results,
})
  
const mapDispatchersToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchersToProps,
    //mapDispatchToProps
)(ResultGrid);