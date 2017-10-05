import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react'

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      value: this.props.keyword
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        value: nextProps.keyword
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

  onSubmitSearch(e) {
    e.preventDefault();
    this.props.onChangeSearch(this.state.value);

    return false;
  }

  render() {
    const title = this.props.title;

    return (
      <div className="clearfix">
        <h2>
          <small>Search {this.props.keyword} within</small><br />
          {title}
        </h2>

        <div className="right">
          <form onSubmit={(e)=> this.onSubmitSearch(e)}>
            <Input size='large' loading={this.state.loading} placeholder='Search....' value={ this.state.value } onChange={(e, data) => this.onChangeSearch(data) }/>
            <Button size='large' onClick={(e)=> this.onSubmitSearch(e)}>Search</Button>
          </form>
        </div>    

        <div>
            <span className="label">{this.props.count}</span> Search Results
        </div>    
        <hr />
      </div>
    );
}
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired
}
