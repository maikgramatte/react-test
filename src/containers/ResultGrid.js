import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Teaser from '../components/Teaser';
import Listing from '../components/Listing';
import ViewModeSwitcher from '../components/ViewModeSwitcher';
import SortSwitcher from '../components/SortSwitcher';
import Header from '../components/Header';

import { setViewMode, loadListings, gridChangeSort, gridReload, gridSearchKeyword } from '../actions';

class ResultGrid extends Component {

  constructor(props) {
      super(props);
  }

  setViewMode(viewMode) {
    this.props.setViewMode(viewMode);
    this.props.gridReload(); 
  }

  setSort(sort) {
    this.props.gridChangeSort(sort);
    this.props.gridReload();
  }

  componentDidMount() {
    this.props.loadListings();
  }

  setKeyword(keywords) {
    this.props.gridSearchKeyword(keywords);
    this.props.gridReload();
  }

  renderLoadingState() {
    return (
        <Dimmer inverted active>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    )
  }

  render() {
    var items;

    if(!this.props.search) {
      return (
        <Dimmer active>
            <Loader active>Loading</Loader>
        </Dimmer>
      );
    }

      if(this.props.search.viewmode === 'default') {
          items = this.props.search.results.map(item => <Teaser key={item.id} item={item} />)
      }
      else {
          items = this.props.search.results.map(item => <Listing key={item.id} item={item} />)
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
                    ...
                  </div>    
                  <div className="column small-4">
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
              <Segment className="row clearfix">
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                  {items}
                </ReactCSSTransitionGroup>
              </Segment>
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultGrid);