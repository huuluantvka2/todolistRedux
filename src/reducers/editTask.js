import * as types from '../constants/actionType';
var initialState = {
    id : '',
    name : '',
    status : false
}
const myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.EDIT_TASK : 
        state = {
            id : action.task.id,
            name : action.task.name,
            status : action.task.status
        }
        return state;
        default : return state;
    }
};

export default myReducer;