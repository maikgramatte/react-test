import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { gridAddSearchFacet } from '../../actions';

class FacetLink extends Component {
  
  constructor(props) {
    super(props);
  }

  clickTerm() {
    this.props.gridAddSearchFacet({
      type: this.props.type,
      label: this.props.label
    });
  }

  render() {
      return(
          <a onClick={() => this.clickTerm()}>
              {this.props.label}
          </a>
      )
  }
}
  
FacetLink.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  object_id: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  search: state.search_results,
})

const mapDispatchToProps = dispatch => ({
  gridAddSearchFacet: bindActionCreators(gridAddSearchFacet, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacetLink);
