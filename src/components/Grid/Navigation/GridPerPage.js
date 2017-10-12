import React, {Component} from 'react';
import { Dropdown, Icon, Button, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import pagerPerPageOptions, { PerPageMax, PerPageSteps, PerPageLazyLoadEnabled } from './Options';
import Scroll from 'react-scroll';

const scroll  = Scroll.animateScroll;

export default class GridPerPage extends Component {

  elementId = 'grid-bottom-element';

  constructor(props) {
    super(props);

    this.state = {
      currentValue: parseInt(props.value, 10),
    }

    this.boundInfiniteScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if(PerPageLazyLoadEnabled && this.props.page === 0 && this.state.value !== PerPageMax) {
      setTimeout(() => {
        window.addEventListener('scroll', this.boundInfiniteScroll);
      }, 1000);   
    }
 }  

  componentWillUnmount() {
    this.removeScrollHandler();
  }

  onElementChanged(value)  {
    if(value !== this.state.currentValue) {

      // Scroll top
      if(this.state.currentValue > value) {
        scroll.scrollToTop();
      }

      this.props.onChange(value);  
      this.setState(
        {
          currentValue: value,
        }
      );
    }
  }

  visibleY = function(el){
    var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height, 
      el = el.parentNode;
    do {
      rect = el.getBoundingClientRect();
      if (top <= rect.bottom === false) return false;
      // Check if the element is out of view due to a container scrolling
      if ((top + height) <= rect.top) return false
      el = el.parentNode;
    } while (el !== document.body);

    // Check its within the document viewport
    return top <= document.documentElement.clientHeight;
  };

  handleScroll() {
    var top = this.visibleY(document.getElementById(this.elementId));

    if(top) {
      if(this.state.currentValue !== PerPageMax) {
        this.removeScrollHandler();
        var new_value = this.getNextPerPageValue();
        setTimeout(() => {
          this.props.onChange(new_value);
        }, 100); 
      }
    }
  }

  getNextPerPageValue() {
    var currentValue = this.state.currentValue;
    var values = pagerPerPageOptions();
    var newValue = false;
    
    values.some(function(item){
      if(item.value > currentValue) {
        newValue = item.value;
        return true;
      }

      return false;
    });

    return newValue;
  }

  removeScrollHandler() {
    window.removeEventListener('scroll', this.boundInfiniteScroll);
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        currentValue: parseInt(props.value, 10),
      }
    );
  }
  

  render(){
    if(this.state.currentValue !== PerPageMax) {
      return (
        <Button fluid basic className="segment" as="div" href="#" onClick={() => this.onElementChanged(PerPageSteps + this.state.currentValue)}>
          <Icon name="angle double down" /> Show {PerPageSteps} more
        </Button>
      )
    }
   
    return (
      <Button fluid basic className="segment" as="div" href="#" onClick={() => this.onElementChanged(this.state.currentValue - PerPageSteps)}>
        <Icon name="angle double up" /> Show {PerPageSteps} less
      </Button>
    )
  }
}

GridPerPage.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}
