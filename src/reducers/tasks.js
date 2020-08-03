import * as types from '../constants/actionType';
import { v4 as uuidv4 } from 'uuid';
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var findIndex = (tasks,id) => {
    let result =-1;
    tasks.forEach((task,index) =>{
      if(task.id === id){
        result = index;
      }
    });
    return result;
  };
const myReducer = (state = initialState , action) => {
    var index = -1;
    var id : '';
    switch(action.type){
        case types.LIST_ALL : return state;
        case types.SAVE_TASK :
            var Task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status
            }
            if(Task.id === ''){
                Task.id = uuidv4();
                state.push(Task);
            }else{
                index = findIndex(state,action.task.id);
                state[index] = Task;
            }
            localStorage.setItem('tasks' , JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS : 
            id = action.id;
            index = findIndex(state,id);
            var cloneTask = {...state[index]};
            cloneTask.status = !cloneTask.status;
            state[index] = cloneTask;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK :
            id = action.id;
            index = findIndex(state,id);
            state.splice(index,1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default : return state;
    }
};

export default myReducer;