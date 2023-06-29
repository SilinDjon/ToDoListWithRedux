import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
     addTodolistTC, fetchTodolistTC, TodolistDomainType
} from "./state/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {TaskType} from "./api/Tasks-api";




export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)

    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(fetchTodolistTC())
    },[])

    const addTodoList = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)

    }, [dispatch]);

    const todoListComponent = todoList.map((tl) => {
        return (
            <Grid key={tl.id} item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <TodolistWithRedux
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '20px'}}>
                    {todoListComponent}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
