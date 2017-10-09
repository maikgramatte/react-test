import React from 'react';
import Pager from 'react-pager';
import Scroll from 'react-scroll';

const scroll     = Scroll.animateScroll;

class GridPager extends React.Component {
    constructor(props) {
        super(props);
 
        this.handlePageChanged = this.handlePageChanged.bind(this);

        var perpage = this.props.perpage;
        var count = this.props.count;
        var divide = Math.ceil(count / perpage);

        this.state = {
          total: 0,
          current: 0,
          visiblePage: 5,
        };

        if(count <= perpage) {
          return ;
        }

        this.state = {
          total: divide,
          current: 0,
          visiblePage: 5,
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
      this.props.setPage(newPage);
      
      scroll.scrollToTop();
      this.setState(
        { current : newPage }
      );



    }
    
    render() {

      if(this.state.total === 0) {
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