import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexAction';
class TaskItem extends Component {
    updateStatus = (id) => {
        this.props.onUpdateStatus(id);
    };
    onDelete = (id) => {
        this.props.onDeleteTask(id);
    };
    onEdit = (task) => {
        this.props.onEditTask(task);
        this.props.onOpenForm()
    };
    render() {
        let {task} = this.props;
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{task.name}</td>
                <td>
                <span className={task.status === true ? "badge badge-success" : "badge badge-danger"} onClick ={() =>this.updateStatus(task.id)}>
                    {task.status === true ? "Kích hoạt" : "Ẩn"}
                </span>
                </td>
                <td>
                <button type="button" className="btn btn-warning mr-1" onClick ={() => this.onEdit(task)}>
                    Sửa
                </button>
                <button type="button" className="btn btn-danger" onClick ={() =>this.onDelete(task.id)}>
                    Xóa
                </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        
    }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onUpdateStatus : (id) => {
        dispatch(actions.updateStatus(id))
      },
      onDeleteTask : (id) => {
        dispatch(actions.deleteTask(id))
      },
      onEditTask : (task) => {
        dispatch(actions.editTask(task))
      },
      onOpenForm : () => {
        dispatch(actions.openForm())
      },
    }
  };
export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);