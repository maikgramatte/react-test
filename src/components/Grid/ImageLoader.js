import React,  {Component} from 'react';
import ImageLoader from 'react-load-image';
import LoadingIcon from './Eclipse.gif';
import PlaceholderIcon from './placeholder.png';

function Preloader(props) {
  return <img src={LoadingIcon} alt="Placeholder" />;
}

export default class GridImageLoader extends Component {
  render() {
    if(this.props.src === null || typeof this.props.src === 'undefined') {
      return <img src={PlaceholderIcon} alt="Placeholder" />;  
    }

    return (
      <ImageLoader src={this.props.src} alt={this.props.alt} title={this.props.title}>
        <img alt={this.props.alt} title={this.props.title} />
        <div>Error!</div>
        <Preloader src={this.props.src} /> 
      </ImageLoader>
    )  
  }
}

