import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexAction';
class TaskSort extends Component {
  onSort = (sortBy,sortValue) => {
    let sort = {
      by : sortBy,
      value : sortValue
    }
    this.props.onSort(sort);
  };
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="btn-group">
                  <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                    Sắp xếp
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick ={() => this.onSort('name',1)} href="/#">Tên A-Z</a>
                    <a className="dropdown-item" onClick ={() => this.onSort('name',-1)} href="/#">Tên Z-A</a> 
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick ={() => this.onSort('status',1)} href="/#">Trạng Thái Kích Hoạt</a>
                    <a className="dropdown-item" onClick ={() => this.onSort('status',-1)} href="/#">Trạng Thái Ẩn</a>
                  </div>
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
      onSort :  (sort) => {
          dispatch(actions.sortTask(sort))
      },
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(TaskSort);