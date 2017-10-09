import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import query from 'qs';

import Teaser from '../components/Teaser';
import Listing from '../components/Listing';
import ViewModeSwitcher from '../components/ViewModeSwitcher';
import SortSwitcher from '../components/SortSwitcher';
import Header from '../components/Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GridPager from '../components/Grid/GridPager';

/**
 * Actions
 */
import { setViewMode, loadListings, gridChangeSort, gridReload, gridSearchKeyword, gridSetData, gridSetPage } from '../actions';


class ResultGrid extends Component {

  constructor(props) {
    super(props);
  }

  setViewMode(viewMode) {
    this.props.setViewMode(viewMode);
    this.props.gridReload(false); 
  }

  setSort(sort) {
    this.props.gridChangeSort(sort);
    this.props.gridReload(true);
    setTimeout(()=> this.fetchData(), 100);
  }

  componentDidMount() {
    this.props.loadListings();
    setTimeout(()=> this.fetchData(), 100);
  }

  fetchData() {
    fetch('http://pharosui.maik/react.json?' + query.stringify(this.props.search.url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }})    
        .then((response) => {
            return response.json()
    }).then((result) => {      
        this.props.gridSetData(result);
    })
  }

  updatePager(page) {
    this.props.gridSetPage(page);
    this.props.gridReload(true); 

    setTimeout(()=> this.fetchData(), 100);
  }

  setKeyword(keywords) {
    this.props.gridSearchKeyword(keywords);
    this.props.gridReload(true); 

    setTimeout(()=> this.fetchData(), 100);
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
            <Segment className="text-center">
                No Results.
            </Segment>    
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
        items = this.props.search.results.map(item => <Teaser key="g`{item.id}`" item={item} />)
    }
    else {
        items = this.props.search.results.map(item => <Listing key={item.id} item={item} />)
    }

    return (
        <Segment className="row clearfix">
            <Grid doubling stackable centered columns={6}>
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
            </Grid>
            <hr />    

            <GridPager current={this.props.search.page} count={this.props.search.count} perpage={20} setPage={(new_page)=>this.updatePager(new_page)} />
        </Segment>
    );
  }

  render() {
    if(!this.props.search) {        
      return (
        <Segment>
           
        </Segment>    
      );
    }

     
    return (
          <Segment className="row" data-vm={ this.props.search.viewmode }>
              <Header 
                  count={this.props.search.count} 
                  keyword={this.props.search.keyword} 
                  title={this.props.search.title} 
                  onChangeSearch={(keyword) => this.setKeyword(keyword)} 
              />
              <div className="row">
                  <div className="column small-4">
                    Show Filters
                  </div>    
                  <div className="column small-4 text-center">
                      <ViewModeSwitcher 
                      viewmode={ this.props.search.viewmode } 
                      setViewMode={(viewmode) => this.setViewMode(viewmode)} 
                  />
                  </div>   
                  <div className="column small-4">
                      <SortSwitcher 
                          value={ this.props.search.sort }
                          onSortChange={(sort) => this.setSort(sort)} 
                      />
                  </div>   
              </div>    

              {this.renderLoadingState()}    
              {this.renderResults()}
              {this.noResults()}

          </Segment>
      );
  }
}

const mapStateToProps = state => ({
    search: state.search_results,
})
  
const mapDispatchToProps = dispatch => ({
  setViewMode: bindActionCreators(setViewMode, dispatch),
  loadListings: bindActionCreators(loadListings, dispatch),
  gridChangeSort: bindActionCreators(gridChangeSort, dispatch),
  gridReload: bindActionCreators(gridReload, dispatch),
  gridSearchKeyword: bindActionCreators(gridSearchKeyword, dispatch),
  gridSetData: bindActionCreators(gridSetData, dispatch),
  gridSetPage: bindActionCreators(gridSetPage, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultGrid);