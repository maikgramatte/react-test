import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'semantic-ui-react'
import SearchFilterIndicator from './SearchResult/SearchFilterIndicator';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      value: this.props.keyword
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        value: nextProps.keyword,
        loading: false
      }
    );
  }

  onChangeSearch(e) {
    this.setState(
      {
        value: e.value
      }
    );
  }

  onResetSearch() {
    this.setState({
      loading: true,
    });

    this.props.onChangeSearch('');
  }

  onSubmitSearch(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.props.onChangeSearch(this.state.value);

    return false;
  }

  render() {
    const title = this.props.title;

    return (
      <div className="ui stackable three column grid header-results">
       <h2 className="column">
          {this.props.keyword &&
            <small>Search "{this.props.keyword}" within</small>
          } 
          {!this.props.keyword &&
            <small>View</small>
          }
          <br />
          {title}
        </h2>
        <div className="column">
          {!this.state.loading && this.props.count !== 0 &&
            <span className="header-results__search-results">
              { this.props.count } Results 
            </span>
          }
        </div>  
        <div className="column">
          <form onSubmit={(e)=> this.onSubmitSearch(e)}>
          <Input
            value={ this.state.value }
            onChange={(e, data) => this.onChangeSearch(data) }
            icon={<Icon name='search' inverted circular link onClick={(e)=> this.onSubmitSearch(e)} />}
            placeholder='Search...'
          />
          </form>
        </div>
        <SearchFilterIndicator onResetSearch={() => this.onResetSearch() } keyword={this.props.keyword} facets={this.props.facets} filters={[]} />
      </div>
    );
  }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    facets: PropTypes.array.isRequired,
}
