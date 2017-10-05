import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Listing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns small-12">
                <div className="row">
                    <div className="columns small-4">
                        <img alt={this.props.item.title} src={this.props.item.cover} />
                    </div>
                    <div className="columns small-8">
                        <h3>{this.props.item.title}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

Listing.propTypes = {
    item: PropTypes.object.isRequired,
}

