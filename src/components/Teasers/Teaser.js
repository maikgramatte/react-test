import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import ImgPreloader from '../Grid/ImageLoader';


export default class Teaser extends Component {
    getIcon() {
        if(this.props.item.format === 'Audio') {
            return (
                <Icon circular name='file audio outline' />
            );            
        }


        if(this.props.item.format === 'Text') {
            return (
                <Icon circular name='file text outline' />
            );            
        }

        return (
            <Icon circular name='video' />
        );        
    }

    render() {
        var key = `k${this.props.item.id}`;

        return (
            <Grid.Column className="column__grid" key={key}>
                <div className="teaser">
                    <div className="teaser__image">
                        <ImgPreloader  alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                        {this.getIcon()}
                    </div>
                    <div className="teaser__inner">
                        <h3>{this.props.item.title}</h3>
                        <p className="teaser__short">(New York, Janus Films)</p>
                    </div>
                </div>
            </Grid.Column>
        );
    }
}

Teaser.propTypes = {
    item: PropTypes.object.isRequired,
}

