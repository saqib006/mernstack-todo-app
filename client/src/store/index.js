import todoReducer from './reducer/todoReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {todoEpic} from './epic/todoEpic';
import { loadState, saveState } from "../PersistState";

const persistedState = loadState();

const rootReducer = combineReducers({
    todoReducer
})

const rootEpic = combineEpics(
    todoEpic.getTodo,
    todoEpic.addTodo,
    todoEpic.delTodo,
    todoEpic.updateTodo
)

const epicMiddleware = createEpicMiddleware(rootEpic)
//epicMiddleware.run(rootEpic)

const connectStoreMiddleware = applyMiddleware(epicMiddleware)

export let store = createStore(rootReducer,persistedState, connectStoreMiddleware)

store.subscribe(()=>{
    saveState(store.getState());
})

