import React from 'react';
import { Segment, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <Segment className="text-center">
      <Icon circular name='info' /> Your search yield no Results. Try to use less filters.
    </Segment>
  );
}