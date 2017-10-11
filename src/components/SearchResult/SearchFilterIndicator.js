import React, {Component} from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { gridRemoveSearchFacet } from '../../actions';

class SearchFilterIndicator extends Component {
  
  removeKeyword() {
    this.props.onResetSearch();
  }

  removeFacet(facet) {
    this.props.gridRemoveSearchFacet(facet);
  }

  renderFacets() {
    if(this.props.facets.length === 0) {
      return null;
    }

    var links = [];
    this.props.facets.map((item) => {
      var label = item.label.split('|'); 

      var label =item.label.split('|'); 
      var full = label.join(' >> ');
      var last = label[label.length - 1];
      var full_label = `Remove category: ${full}`;

      links.push(<Label as='a' title={full_label} key={full_label} onClick={() => this.removeFacet(item)}>
        {last}
        <Icon name='delete'/>
      </Label>);

      return true;
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
const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  gridRemoveSearchFacet: bindActionCreators(gridRemoveSearchFacet, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilterIndicator);
