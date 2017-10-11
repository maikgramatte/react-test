import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
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
import ErrorPage from '../components/SearchResult/Error';


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
        <Segment className="content-loader grid-max-width">
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
    var items;
    const viewmode = this.props.search.viewmode;

    if(viewmode === 'default') {
        items = this.props.search.results.map(item => <Teaser key={item.id} item={item} />)
        items = <Grid doubling stackable columns={5}>{items}</Grid>;
    }
    else {
        items = this.props.search.results.map(item => <Listing key={item.id} item={item} />)
    }

    return (
        <div key={this.props.search.viewmode} className="grid-results">
            {this.renderLoadingState()}
            {this.noResults()}
            
            {items &&
                <Segment vertical className="grid-max-width">
                    {items}
                </Segment>    
            }
        </div>
    );
  }


    renderBottomNavigation() {
        if(this.props.search.count <= 20) {
            return null;
        }

        return (
            <Segment vertical>
                <hr />

                {this.props.search.lazyload &&
                    <Dimmer inverted active>
                        <Loader inverted>Loading more items</Loader>
                    </Dimmer>
                }  
                <div className="grid-max-width">
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
                </div>
            </Segment>
        )
    }

    render() {
        if(this.props.search.httpError) {
            return <ErrorPage type={this.props.search.httpError} />;
        }

        if(this.props.search.initialized === false) {        
            return (
            <Segment key="loading" className="content-loader">
                <Dimmer inverted active>
                    <Loader inverted>Loading items...</Loader>
                </Dimmer>
            </Segment>    
            );
        }
        
        return (
            <div>
                <div className="image-banner">
                    <div className="grid-max-width">
                        Comics in the 17th Century / Loaded in <label>{this.props.search.timer}sec</label>
                    </div>
                </div>  
          
                <Header 
                    count={this.props.search.count} 
                    keyword={this.props.search.keyword} 
                    className="grid-max-width"
                    facets={this.props.search.facets}
                    title={this.props.search.title} 
                    onChangeSearch={(keyword) => this.setKeyword(keyword)} 
                />
                <hr style={{clear: 'both'}}/>
                
                <div className="ui stackable three column grid grid-max-width">
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

                {this.renderResults()}
                {this.renderBottomNavigation()}
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