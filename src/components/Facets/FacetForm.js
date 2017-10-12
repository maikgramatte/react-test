import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Segment, Label, Grid } from 'semantic-ui-react'

export default class FacetForm extends Component {
  render() {
    return (
      <Segment raised>

        <p>Please Select from the following Categories:</p>
        <Grid stackable columns={3}>
          {this.props.facets.map((item) => {
            return (
              <Grid.Column>
                <Label>{item.title}</Label><br />
                <Dropdown 
                  placeholder={item.title} 
                  search 
                  fluid 
                  selection 
                  multiple 
                  options={item.items} 
                /> 
              </Grid.Column>
            )  
          })}
        </Grid>
        </Segment>
    );
  }
}
  
FacetForm.propTypes = {
  facets: PropTypes.array.isRequired,
}
