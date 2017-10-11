import React, {Component} from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export default class Error extends Component {
  render() {
   return (
      <Segment key="error">
        <h2 className="ui header">Connection Error <small className="sub header">{this.props.type.message}</small></h2>
        <p><Icon name='warning sign' /> We encountered an Error with your connection. May you are offline.</p>
        <p><Button>Reset and Reload</Button></p>
      </Segment>   
    )
  }
}


Error.propTypes = {
  type: PropTypes.any,
}