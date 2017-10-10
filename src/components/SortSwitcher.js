import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react'

const sortOptions = [
    {
        text: 'Sort by Tite',
        value: 'default',
    },
    {
        text: 'Sort by Relevance',
        value: 'relevance',
    }
];

class SortSwitcher extends React.Component {

    onSearchChange(e, data) {
      if(this.props.value !== data.value) {
        this.props.onSortChange(data.value);
      }  
    }  

    render() {
        return (
            <div>
                <Dropdown 
                    options={sortOptions} 
                    fluid
                    value={this.props.value}
                    selection
                    onChange={ (e, data) => this.onSearchChange(e, data) }
                />
            </div>
        );
    }
}

export default SortSwitcher;

SortSwitcher.propTypes = {
    value: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired
}
