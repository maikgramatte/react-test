import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgPreloader from '../Grid/ImageLoader';
import renderHTML from 'react-render-html';
import { Segment } from 'semantic-ui-react';
import FacetLink from './FacetLink';
import TeaserData from './TeaserData';

export default class Listing extends Component {

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

    render() {
        return (
            <Segment className="ui grid text-left padded">
                <div className="two wide column">
                    <ImgPreloader alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                </div>
                <div className="four wide column">
                    <TeaserData item={this.props.item} />
                    {this.renderSubjectFacet(this.props.item.facets.subject)}
                </div>

                <div className="ten wide column">
                    {this.props.item.abstract !== null &&
                        renderHTML(this.props.item.abstract)
                    }
                </div>                    
            </Segment> 
        );
    }
}

Listing.propTypes = {
    item: PropTypes.object.isRequired,
}

