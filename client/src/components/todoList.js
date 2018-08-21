import React, {Component} from 'react';
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
class TodoList extends Component{
    
    render(){
        return(
            
            <div style={{backgroundColor:"white"}}>
                
            <List component="nav">
            <ListItem button key={this.props.id}>
            <ListItemText>{this.props.value.todo}</ListItemText>
            <ListItemSecondaryAction>

                <IconButton onClick={this.props.updateEv}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={this.props.deleteEv}>

                    <DeleteForeverIcon /> 
                </IconButton>
                
            </ListItemSecondaryAction>

            </ListItem>
           
            
            </List>
            </div>
           
            
           
        )
    }
}

export default TodoList;