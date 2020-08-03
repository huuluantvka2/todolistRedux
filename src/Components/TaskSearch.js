import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexAction';
class TaskSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword : ''
    }
  }
  onChange = (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    })
  }
  onSearch = () =>{
    this.props.onSearch(this.state.keyword);
  }
    render() {
        return (
            <div className="col-sm-6">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Nhập từ khóa..." name ="keyword" value ={this.state.keyword} onChange ={this.onChange} />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" onClick ={this.onSearch} type="button">Tìm</button>
                  </span>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
      
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
      onSearch :  (keyword) => {
          dispatch(actions.search(keyword))
      },
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(TaskSearch);