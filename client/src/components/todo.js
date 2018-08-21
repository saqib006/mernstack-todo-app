import React, {Component} from 'react';
import {connect} from 'react-redux';
import TodoList from './todoList';
import {AppBar, Typography, Toolbar, Button, Grid, Dialog,DialogActions, DialogContent, DialogTitle , FormControl, Input, InputLabel} from '@material-ui/core';
import './style.css';
import todoAction from '../store/action/todoAction';

class Todo extends Component{
    constructor(props){
        super(props);

        this.state = {
            dialog:false,
            task:'',
            btnName:"Submit",
            key:'',
            title:'Add your Task'
           
        }

       

        
        
    }

    componentWillMount(){
        this.props.getTodo()
       
    }

    openDialog = () => {
        this.setState({
            dialog:true,
            btnName:"Submit",
            title:'Add your Task',
            task:''
        })
    }

    closeDialog = () => {
        this.setState({
            dialog:false,
        })
    }

    changeHandler = (eve) => {
        this.setState({[eve.target.name]: eve.target.value})
    }

    submitHandler = () => {
        if(this.state.btnName === "Submit"){

        this.setState({
            title:'Add your Task',
        })
        
        let obj = {
            todo:this.state.task,
        }
        this.props.addTodo(obj)

        this.setState({
            dialog:false,
            task:''
        })
        }

        else if(this.state.btnName === "Update"){

            this.setState({
                
                dialog:true
                
            })

            let obj = {
                _id:this.state.key,
                todo:this.state.task
            }

            this.props.updateTodo(obj)

          
            this.afterUpdate()
        
        
           
        }

    }

    delHandler = (id) => {
        
        this.props.delTodo(id)
    }

    updateHandler = (id, todo) => {
        
        this.setState({
            dialog:true,
            btnName:"Update",
            key:id,
            task:todo,
            title:'Update Your Task',
            
        })

    }

  

   
     afterUpdate = () => {

       this.setState({
                dialog:false,
                btnName:"Submit",
                task:'',
                key:'',
                title:'Add your Task'
            })
    
            
    }
   

    render(){

    

        return(
            <div style={{backgroundColor:"#EEEEEE"}}>
            <AppBar position="static">
            <Toolbar>
            <Typography variant="title" color="inherit" >
                Ultimate Todo
            </Typography>
            </Toolbar>
            </AppBar>

            <Button variant="contained" color="secondary" onClick={this.openDialog}>Add Task</Button>

           
           <Grid container direction="row" justify="center">
            <Grid item xs={12} sm={8}>

           
            <Dialog
          open={this.state.dialog}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title" >{this.state.title} </DialogTitle>
          <DialogContent>


          <FormControl fullWidth>
            <InputLabel htmlFor="task">Name</InputLabel>
            <Input id='task' name="task" value={this.state.task} onChange={this.changeHandler}/>
            </FormControl>
  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>

            
            <Button onClick={this.submitHandler} color="secondary">
              {this.state.btnName}
            </Button>
          </DialogActions>
        </Dialog>

       </Grid>
            </Grid>

            <Grid container direction="row" justify="center">
            <Grid item xs={12} sm={8}>

            {
                this.props.todoList.map((item)=>{
                    return <TodoList id={item._id} value={item} deleteEv={()=> this.delHandler(item._id)} updateEv={()=>this.updateHandler(item._id, item.todo)} />
                })
            }
           

           
            

            </Grid>
            </Grid>
            
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        todoList:state.todoReducer.todo
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        getTodo: () => {return dispatch(todoAction.getTodo())},
        addTodo: payload => { return dispatch(todoAction.addTodo(payload))},
        delTodo: id => {return dispatch(todoAction.delTodo(id))},
        updateTodo:payload => {return dispatch(todoAction.updateTodo(payload))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
