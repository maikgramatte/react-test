import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TeaserData extends Component {

  

  render() {
    var duration = null;

    if(this.props.item.duration) {
      duration = Number(this.props.item.duration / 100).toFixed(0) + ' min';
    }

    return (
      <div>
        <h3>
        {this.props.item.series &&
          <a>
              {this.props.item.series}<br />
          </a>
        } {this.props.item.title}</h3>

        <p className="teaser__short">({this.props.item.publisher}, {this.props.item.release_date})</p>
        {duration &&  
          <p>{duration}</p>
        }
      </div>
    );  
  }
}  

TeaserData.propTypes = {
  item: PropTypes.object.isRequired,
}
