import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';

import { gridAddSearchFacet } from '../../actions';

class FacetLink extends Component {
  
  clickTerm() {
    this.props.gridAddSearchFacet({
      type: this.props.type,
      label: this.props.label
    });
  }

  render() {
    var label =this.props.label.split('|'); 
    var full = label.join(' >> ');
    var last = label[label.length - 1];
    var full_label = `View all in Category: ${full}`;
    
    return (
      <Label as="a" onClick={() => this.clickTerm()} title={full_label} key={full}>
        {last}
      </Label>
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
