import React, { Component } from 'react';
import Title from './Components/Title';
import TaskForm from './Components/TaskForm';
import TaskControl from './Components/TaskControl';
import TaskList from './Components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/indexAction';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }
  onShowForm = () => {
    var task = {
      id : '',
      name : '',
      status : false
    }
    let {taskEditing} = this.props;
    if(taskEditing && taskEditing.id !== ''){
      this.props.onOpenForm();
      this.props.onClearTask(task);
    }else {
      this.props.onToggleForm();
      this.props.onClearTask(task);
    }
  };
  onSort = (sortBy,sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    })
  };
  componentDidMount() {
    if(localStorage.getItem('tasks')){
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }
  
  render() {
    let {isDisplayForm} = this.props;   
    // if(sortBy === 'name'){
    //   tasks.sort((a,b) =>{
    //     if(a.name > b.name){
    //       return sortValue
    //     } else if(a.name === b.name){
    //       return 0
    //     } else{
    //       return -sortValue;
    //     }
    //   })
    // } else{
    //   tasks.sort((a,b) =>{
    //     if(a.status > b.status){
    //       return -sortValue
    //     } else if(a.status === b.status){
    //       return 0
    //     } else{
    //       return sortValue;
    //     }
    //   })
    // }
    return (
      <div className="container">
        {/* Title */}
          <Title />
        {/* end Title */}
        <div className="row">
          {/* Form */}
          <div className={isDisplayForm === true ? "col-sm-4" : ""}>
            <TaskForm/>
          </div>
          {/* end Form */}
          <div className={isDisplayForm === true ? "col-sm-8" : "col-sm-12"}>
            <button type="button" className="btn btn-primary mb-2" onClick ={this.onShowForm}>Thêm Công Việc</button>
            {/* TaskControl : TaskSearch , TaskSort */}
              <TaskControl onSort = {this.onSort} />
            {/* end TaskControl */}
            {/* TaskList : TaskItem */}
              <TaskList 
                onFilter = {this.onFilter}
              />
            {/* end TaskItem */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.displayForm,
    taskEditing : state.editTask
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm())
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task))
    },
    onOpenForm : () => {
      dispatch(actions.openForm())
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);