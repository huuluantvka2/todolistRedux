import { combineReducers } from 'redux';
import tasks from './tasks';
import displayForm from './displayForm';
import editTask from './editTask';
import filterTable from './filterTable';
import searchTask from './searchTask';
import sortTask from './sortTask';
const myReducer = combineReducers({
    tasks,
    displayForm,
    editTask,
    filterTable,
    searchTask,
    sortTask
});
export default myReducer;