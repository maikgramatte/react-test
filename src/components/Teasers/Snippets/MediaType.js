import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'

export default class MediaType extends Component {
  render() {
    if(this.props.format === 'Audio') {
      return (
          <Icon circular name='file audio outline' />
      );            
    }
    
    if(this.props.format === 'Text') {
      return (
        <Icon circular name='file text outline' />
      );            
    }
    
    return (
      <Icon circular name='video' />
    );        
  }
}


MediaType.propTypes = {
  format: PropTypes.string.isRequired,
}
