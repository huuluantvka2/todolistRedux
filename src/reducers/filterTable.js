import * as types from '../constants/actionType';
var initialState = {
    name : '',
    status : -1
}
const myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.FILTER_TABLE :
            state = {
                name : action.filter.name,
                status : +action.filter.status
            }
            return state;
        default : return state;
    }
};

export default myReducer;