import React, {Component} from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SearchFilterIndicator extends Component {
  
  removeKeyword() {
    this.props.onResetSearch();
  }

  renderFacets() {
    if(this.props.facets.length === 0) {
      return null;
    }

    var links = [];
    this.props.facets.map(function(item){
      links.push(<Label as='a' title="Remove Category">
        {item.label}  
        <Icon name='delete'/>
      </Label>);
    });

    return links;
  }

  render() {

    if(!this.props.keyword && !this.props.facets) {
      return null;
    }
    
    return (
      <div className="sixteen wide column">
        {this.props.keyword &&
          <Label as='a' title="Remove Keyword" onClick={(e) => this.removeKeyword()}>
            Keyword: {this.props.keyword}
            <Icon name='delete' />
          </Label>
        }

         {this.renderFacets()}
      </div>
    );
  }
}

SearchFilterIndicator.propTypes = {
  keyword: PropTypes.any,
  facets: PropTypes.array.isRequired,
  onResetSearch: PropTypes.func.isRequired,
}
