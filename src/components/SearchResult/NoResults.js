import React from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react'

export default () => {
  return (
    <Segment className="text-center grid-max-width">
      <p><Icon circular name='info' /> Your search has no Results. Try to use less filters.</p>
      <p><Button>Reset all Filters</Button></p>
    </Segment>
  );
}