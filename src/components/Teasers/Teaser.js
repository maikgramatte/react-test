import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import ImgPreloader from '../Grid/ImageLoader';
import TeaserData from './TeaserData';

export default class Teaser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            width: '',
        };
    }
    
    hoverStyle = {
        position: 'absolute',
        width: '300px',
        top: 0,
        height: 400,
        left: '-50px',
        zIndex: 500,
        background: 'White'
    }

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
            <Grid.Column className="column__grid" key={key} style={{width: this.state.width}}>
                <div className="teaser" onMouseEnter={() => this.setState({hover: true }) } onMouseLeave={() => this.setState({hover: false}) }>
                    <div className="teaser__image">
                        <ImgPreloader  alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                        {this.getIcon()}
                    </div>
                    <div className="teaser__inner">
                        <TeaserData item={this.props.item} />
                    </div>

                    {this.state.hover &&
                        <div>Hover</div>
                    }

                </div>
            </Grid.Column>
        );
    }
}

Teaser.propTypes = {
    item: PropTypes.object.isRequired,
}

