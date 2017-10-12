import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import renderHTML from 'react-render-html';

export default class TeaserInfo extends Component {

  addRow(item) {
    return (
      <Table.Row verticalAlign="top">
        <Table.HeaderCell>{item.label}</Table.HeaderCell>
        <Table.Cell>{renderHTML(item.data)}</Table.Cell>
      </Table.Row>
    )
  }


  render() {
    return (
      <Table celled padded>
        {this.props.data.map((item) => this.addRow(item))}
      </Table>
    );  
  }
}  

TeaserInfo.propTypes = {
  data: PropTypes.array.isRequired,
}
