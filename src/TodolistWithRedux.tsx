import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType} from "./state/store";
import {
    addTaskTC,
    changeStatusAC,
    changeTaskTitleAC,
    fetchTasksTC,
    removeTaskAC
} from "./state/TasksReducer";
import {
    changeTodoListFilterAC,
     changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC
} from "./state/TodoListsReducer";
import {Task} from "./components/Task";
import {TaskType} from "./api/Tasks-api";
import {TaskStatuses} from "./api/Todolist-api";

type TodolistPropsType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}

export const TodolistWithRedux = React.memo((props: TodolistPropsType) => {
    console.log('to-do')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistId, title))
    }, [dispatch]);

    const tsarHandler = useCallback((value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(value, props.todolistId));
    }, [dispatch, props.todolistId])

    const onClickRemoveTodoList = () => {
        let action = removeTodolistTC(props.todolistId)
        dispatch(action)
    }

    const changeTodoListTitle = useCallback((title: string) => dispatch(changeTodolistTitleTC(title, props.todolistId)), [dispatch, props.todolistId]);

    if (props.filter === "Active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "Completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks && tasks.map(t => <Task key={t.id} todolistId={props.todolistId} task={t} removeTask={removeTaskAC}
                                         changeStatus={changeStatusAC} changeTaskTitle={changeTaskTitleAC}/>)
                }
            </div>
            <div>
                <ButtonGroup
                    size={'small'}
                    disableElevation

                >
                    <Button
                        variant={props.filter === 'All' ? 'outlined' : 'contained'}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                        onClick={() => tsarHandler('All')}>All</Button>
                    <Button
                        variant={props.filter === 'Completed' ? 'outlined' : 'contained'}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                        onClick={() => tsarHandler('Completed')}>Completed</Button>
                    <Button
                        variant={props.filter === 'Active' ? 'outlined' : 'contained'}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                        onClick={() => tsarHandler('Active')}>Active</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})








