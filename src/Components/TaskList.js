import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect} from 'react-redux';
import * as actions from '../actions/indexAction';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }
    onChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name] : value
        })
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus,
        }
        this.props.onFilterTable(filter);
    };
    render() {
        let {tasks,filter,keyword,sort} = this.props;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                })
            }
            if(filter.status !== -1){
                tasks = tasks.filter((task) =>{
                    return task.status === (filter.status === 0 ? false : true);
                })
            }
        }
        if(keyword){
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
        }
        if(sort){
            if(sort.by === 'name'){
                tasks.sort((a,b) => {
                    if(a.name > b.name){
                        return sort.value;
                    }
                    else if(a.name === b.name){
                        return 0;
                    }
                    else return -sort.value
                })
            }
            else{
                tasks.sort((a,b) => {
                    if(a.status > b.status){
                        return -sort.value;
                    }
                    else if(a.status === b.status){
                        return 0;
                    }
                    else return sort.value
                })
            }
        }
        let elmItems = tasks.map((task,index) =>{
            return <TaskItem 
                        key ={task.id} 
                        index ={index} 
                        task = {task}
                    /> 
        })
        return (
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td />
                            <td>
                            <input type="text" className="form-control" name ="filterName" value ={this.state.filterName} onChange ={this.onChange} />
                            </td>
                            <td>
                            <select className="form-control" name ="filterStatus" value ={this.state.filterStatus} onChange ={this.onChange}>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                            </td>
                            <td />
                        </tr>
                        {elmItems}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tasks : state.tasks,
        filter : state.filterTable,
        keyword : state.searchTask,
        sort : state.sortTask
    }
};
const mapDispatchToProps = (dispatch,props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTable(filter))
        },
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);