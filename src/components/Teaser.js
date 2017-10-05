import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Teaser extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns small-3">
                <h3>{this.props.item.title}</h3>
                <img alt={this.props.item.title} src={this.props.item.cover} />
            </div>
        );
    }
}

Teaser.propTypes = {
    item: PropTypes.object.isRequired,
}

