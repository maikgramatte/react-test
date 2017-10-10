import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgPreloader from '../Grid/ImageLoader';
import renderHTML from 'react-render-html';
import { Segment, Label } from 'semantic-ui-react';
import FacetLink from './FacetLink';

export default class Listing extends Component {

    renderSubjectSingle(item) {
        var last = item[item.length - 1];
        var removedLast = item.slice(0, -1);

        return (
            <Label>
                <FacetLink 
                    type="subject" 
                    label={last} 
                    object_id={this.props.item.id}>
                </FacetLink>
                <span onClick={() => console.log(1)}></span>
                <Label.Detail>
                    {removedLast.join(' >> ')}
                </Label.Detail>    
            </Label>
        );
    }

    renderSubjectFacet(subject) {
        var rendered_items = [];
        var data = subject.data;

        data.map((item) => {
            rendered_items.push(this.renderSubjectSingle(item));
        });

        return <div><strong>{subject.title}:</strong><br /> {rendered_items}</div>;
    }

    render() {
        return (
            <Segment className="ui grid text-left">
                <div className="two wide column">
                    <ImgPreloader alt={this.props.item.title} title={this.props.item.title} src={this.props.item.cover} />
                </div>
                <div className="four wide column">
                    <h3>{this.props.item.title}</h3>
                    <p className="teaser__short">(New York, Janus Films)</p>
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

