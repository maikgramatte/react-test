import React from 'react';
import Pager from 'react-pager';
import Scroll from 'react-scroll';

const scroll     = Scroll.animateScroll;

class GridPager extends React.Component {

    visiblePages = 5;

    constructor(props) {
        super(props);

        this.handlePageChanged = this.handlePageChanged.bind(this);

        var perpage = this.props.perpage;
        var count = this.props.count;
        var divide = Math.ceil(count / perpage);

       

        if(count <= perpage) {
          this.state = {
            disabled: true,
          }  


          return ;
        }

        this.state = {
          total: divide,
          disabled: false,
          current: parseInt(props.current, 0),
          visiblePage: this.visiblePages,
        };
    }

    componentWillReceiveProps(nextProps) {
      var perpage = nextProps.perpage;
      var count = nextProps.count;
      var divide = Math.ceil(count / perpage);
      
      this.setState(
        {
          total: divide,
          current: nextProps.current 
        }
      );
    }
    
    

    handlePageChanged(newPage) {

      if(newPage === this.state.current) {
        return false;
      }

      this.props.setPage(newPage);
      scroll.scrollToTop();
      
      this.setState({ 
        current : newPage 
      });
    }
    
    render() {
      if(this.state.total === 0 || this.state.disabled) {
        return null;
      }

      return (
        <div className="pagination-centered">
          <Pager
              total={this.state.total}
              current={this.state.current}
              visiblePages={this.state.visiblePage}
              titles={{ first: '<|', last: '>|' }}
              className="pagination"
              onPageChanged={this.handlePageChanged}
          />
        </div>  
      );
    }
}

export default GridPager;