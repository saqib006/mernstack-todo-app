import todoAction from '../action/todoAction';

const INITIAL_STATE = {
    todo:[],
    isLoad:false
}

export default function todoReducer(state = INITIAL_STATE, action){
    switch(action.type){

        case todoAction.ADD_TODO_PRO:
            return Object.assign({}, state, {isLoad:true})
        case todoAction.ADD_TODO_SUC:
            return Object.assign({}, state, {isLoad:false, todo:[...state.todo, action.payload]})

        case todoAction.GET_TODO_PRO:
            return Object.assign({}, state, {isLoad:true})
        case todoAction.GET_TODO_SUC:
            return Object.assign({}, state, {isLoad:false, todo:action.payload})

        case todoAction.DEL_TODO_PRO:
            return Object.assign({}, state, {isLoad:true})
        case todoAction.DEL_TODO_SUC:
            return Object.assign({}, state, {isLoad:false,todo:state.todo.filter(ele => ele._id !== action.payload)})
           
        case todoAction.UPDATE_TODO_PRO:
            return Object.assign({}, state, {isLoad:true})
        case todoAction.UPDATE_TODO_SUC:
            let obj = {...state};
            let index = obj.todo.findIndex(element => element._id == action.payload._id)
            obj.todo[index].todo = action.payload.todo;
            return Object.assign({}, state,{isLoad:false, todo:[...state.todo]});
            
           

            

        default:
            return state

    }
} 