import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types';

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
      this.props.onSortChange(data.value);
    }  

    render() {
        return (
            <div>
                <Dropdown 
                    placeholder='Sort by' 
                    fluid 
                    value={this.props.value} 
                    options={sortOptions} 
                    onChange={ (e, data) => this.onSearchChange(e, data) }/>
            </div>
        );
    }
}

export default SortSwitcher;

SortSwitcher.propTypes = {
    value: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired
}
