import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexAction';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            status : true,
            id : ''
        }
    }
    
    onCloseForm = () => {
        var task = {
            id : '',
            name : '',
            status : false
        }
        this.props.onClearTask(task);
        this.props.onCloseForm();
    };
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === 'status'){
            value = value === 'true' ? true : false;
        }
        this.setState ({
            [name] : value
        })
    };
    onClear = () => {
        this.setState({
            name : '',
            status : true,
            id : ''
        })
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.props.onCloseForm();
        this.onClear()
    };
    componentDidMount() {
        let {taskEditing} = this.props;
        if(taskEditing.id !==''){
            this.setState({
                name : taskEditing.name,
                id : taskEditing.id,
                status : taskEditing.status
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let keyy = prevProps.taskEditing;
        let {taskEditing} = this.props;
        if(keyy.id !== prevState.id || keyy.id !== taskEditing.id ){
            this.setState({
                name : taskEditing.name,
                status : taskEditing.status,
                id : taskEditing.id
            })
        }
    }
    
    render() {
        let {isDisplayForm,taskEditing} = this.props;
        if(!isDisplayForm) return '';
        return (
                <div className="card border-card">
                    <div className="card-header bg-card">
                        {taskEditing.id ==='' ? 'Thêm công việc' : 'Cập nhật công việc'}
                    </div>
                    <div className="card-body" onSubmit ={this.onSubmit}>
                        <label>Tên :</label>
                        <input type="text" className="form-control mt-2" name ="name" value ={this.state.name} onChange ={this.onChange} />
                        <label>Trạng Thái :</label>
                        <select className="form-control" name ="status" value ={this.state.status} onChange ={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                        </select>
                        <button type="submit" className="btn btn-warning mt-2 mr-1" onClick = {this.onSubmit}>Thêm</button>
                        <button type="submit" className="btn btn-danger mt-2" onClick = {this.onCloseForm}>Hủy Bỏ</button>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.displayForm,
        tasks : state.tasks,
        taskEditing : state.editTask
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask :  (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task))
        },
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);