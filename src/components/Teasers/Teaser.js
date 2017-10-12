import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react'
import ImgPreloader from '../Grid/ImageLoader';
import TeaserData from './Snippets/TeaserData';
import MediaType from './Snippets/MediaType';

export default class Teaser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            width: '',
        };
    }

    render() {
        var key = `k${this.props.item.id}`;

        return (
            <Grid.Column className="column__grid" key={key}>
                <div className="teaser">
                    <div className="teaser__image">
                        <ImgPreloader  alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                        <MediaType type={this.props.item.format} />
                    </div>
                    <div className="teaser__inner">
                        <TeaserData item={this.props.item} />
                    </div>

                    <div className="teaser__hover">
                        <Button 
                            as='a'
                            fluid
                            icon='play'
                            color='red'
                            content='View'
                        ></Button>
                    </div>
                </div>
            </Grid.Column>
        );
    }
}

Teaser.propTypes = {
    item: PropTypes.object.isRequired,
}

