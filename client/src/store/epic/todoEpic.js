import todoAction from '../action/todoAction';
import {Observable} from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
export class todoEpic {



    static getTodo(action$){
        return action$.ofType(todoAction.GET_TODO_PRO).switchMap(()=>{
             return ajax.getJSON('/api/todo').map((res)=>{
                return{
                    type:todoAction.GET_TODO_SUC,
                    payload:res
                }
                
            })
        })
    }

    static addTodo(action$){
        return action$.ofType(todoAction.ADD_TODO_PRO).mergeMap(({payload})=>{
            return ajax.post('/api/todo',payload).map(res=>{
                return{
                    type:todoAction.ADD_TODO_SUC,
                    payload:res.response
                }
            })
           
            })
       
    }

    static delTodo(action$){
        return action$.ofType(todoAction.DEL_TODO_PRO).switchMap(({payload})=>{
            return ajax.delete(`api/todo/${payload}`).map(res=>{
                return{
                    type:todoAction.DEL_TODO_SUC,
                    payload:payload
                }
            })
           
            })
       
    }


    static updateTodo(action$){
        return action$.ofType(todoAction.UPDATE_TODO_PRO).mergeMap(({payload})=>{
            return ajax.put('/api/todo',payload).map(res=>{
                return{
                    type:todoAction.UPDATE_TODO_SUC,
                    payload:res.response.todo
                }
            })
           
            })
       
    }
    
    
}

