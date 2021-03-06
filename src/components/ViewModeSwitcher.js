import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react'
import './css/view-switcher.css';

export default class ViewModeSwitcher extends Component {

    render() {
        const callback = this.props.setViewMode;
        const currentValue = this.props.viewmode

        return (
            <menu className="grid-view-switcher text-center">
                <span className= { currentValue === 'default' ?  'active' : 'not-active' } onClick={ () => callback('default') }>
                    <Popup
                        trigger={<Icon name='grid layout' size='big' />}
                        content='Grid View'
                    />
                </span>
                <span className= { currentValue === 'list' ?  'active' : 'not-active' } onClick={ () => callback('list') }>
                    <Popup
                        trigger={<Icon name='list layout' size='big' />}
                        content='Table View'
                    />
                </span>
            </menu>
        );
    }
}

ViewModeSwitcher.propTypes = {
    viewmode: PropTypes.string.isRequired,
    setViewMode: PropTypes.func.isRequired,
}
