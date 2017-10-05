import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ViewModeSwitcher extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const callback = this.props.setViewMode;
        const currentValue = this.props.viewmode

        return (
            <div className="columns">
                <dl className="sub-nav">
                    <dd className= { currentValue === 'default' ?  'active' : 'not-active' } onClick={ () => callback('default') }>
                        <a>Grid</a>
                    </dd>
                    <dd className= { currentValue === 'list' ?  'active' : 'not-active' } onClick={ () => callback('list') }>
                        <a>List</a>
                    </dd>
                </dl>
            </div>
        );
    }
}

ViewModeSwitcher.propTypes = {
    viewmode: PropTypes.string.isRequired,
    setViewMode: PropTypes.func.isRequired,
}
