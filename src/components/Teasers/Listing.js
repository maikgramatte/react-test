import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgPreloader from '../Grid/ImageLoader';
import renderHTML from 'react-render-html';
import { Segment, Grid, Button } from 'semantic-ui-react';
import FacetLink from './FacetLink';
import TeaserData from './Snippets/TeaserData';
import MediaType from './Snippets/MediaType';
import TeaserInfo from './Snippets/TeaserInfo';
import '../css/grid-listing-teaser.css';
import { Transition } from 'react-transition-group';

export default class Listing extends Component {

    default_state = {
        full: false,
        label: 'Show more',
        icon: 'angle down',
        transition: false,
    }

    transition_time = 400

    enabled_state = {
        full: true,
        label: 'Show less',
        icon: 'angle up',
        transition: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            ...this.default_state,
            height: 'auto'
        };
    }


    toggleState() {
        var current_state = this.state.full;

        if(current_state) {
            this.setState(
                {
                    transition: false,
                }
            );

            setTimeout(() => {
                this.setState(this.default_state);
            }, this.transition_time);
        }
        else {
            this.setState(this.enabled_state);
        }
    }

    renderSubjectSingle(item) {

        var key = `${this.props.item.id}--subject-${item}`;

        return (
            <FacetLink 
                    type="subject" 
                    label={item}         
                    key={key} 
                    object_id={this.props.item.id}>
                </FacetLink> 
        );
    }

    renderSubjectFacet(subject) {
        var rendered_items = [];
        var data = subject.data;

        data.map((item) => {
            rendered_items.push(this.renderSubjectSingle(item));
            return true;
        });

        return <div><strong>{subject.title}:</strong><br /> {rendered_items}</div>;
    }


    showDetails() {
        if(this.state.full === false){
            return (
                <p>
                    {this.props.item.abstract} <br /><br />
                    <Button compact icon={this.state.icon} content={this.state.label} onClick={() => this.toggleState()}></Button>
                </p>
            )
        }

        return (
            <div>
                {renderHTML(this.props.item.abstract_long)}
                
                {this.renderSubjectFacet(this.props.item.facets.subject)}

                <br /><br />

                <TeaserInfo data={this.props.item.data} />    


                <br /><br />

                <p>
                    <Button compact icon={this.state.icon} content={this.state.label} onClick={() => this.toggleState()}></Button>
                </p>
            </div> 
        );
    }

    setElementHeight(node){
        this.setState({
            height: node.clientHeight  
        });
    }

    render() {
        return (
            <Segment vertical className="grid-item-listing">
                <Grid padded columns={2} stackable>
                    <Grid.Column>
                        <Grid padded columns={2}>
                            <Grid.Column className="image" width={4}>
                                <ImgPreloader alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                            </Grid.Column>  

                            <Grid.Column className="brief" width={12}>
                                <MediaType type={this.props.item.type} />
                                <TeaserData item={this.props.item} />
                            </Grid.Column>         
                        </Grid>
                    </Grid.Column>     

                    <Grid.Column>  
                        <Grid padded columns={1}>
                            <Grid.Column className="abstract">
                                <Transition timeout={this.transition_time} in={this.state.transition} onEntered={(node) => this.setElementHeight(node)}>
                                    {(status) => (
                                        <div className={`fade fade-${status}`} style={{height: this.state.height}}>
                                            {this.showDetails()}
                                        </div>    
                                    )}    
                                </Transition> 
                            </Grid.Column>
                        </Grid>  
                    </Grid.Column>    
                </Grid>
            </Segment>
        );
    }
}

Listing.propTypes = {
    item: PropTypes.object.isRequired,
}

