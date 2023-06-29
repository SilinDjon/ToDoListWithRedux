import {useDispatch} from "react-redux";
import {changeTaskTitleAC, removeTaskTC, updateTaskStatusTC} from "../state/TasksReducer";
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../api/Tasks-api";
import {TaskStatuses} from "../api/Todolist-api";
import {AppDispatchType} from "../state/store";


type TaskPropsType = {
    changeStatus: (id: string, eventStatus: TaskStatuses, todoListId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    task: TaskType,
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch<AppDispatchType>()

    const removeTaskHandler = () => {
        dispatch(removeTaskTC(props.task.id, props.todolistId))
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskStatusTC(props.task.id, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}, props.todolistId))


    }

    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(props.task.id, title, props.todolistId)), [props.task.id, props.todolistId, dispatch])

    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox
                onChange={changeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <IconButton onClick={removeTaskHandler}>
                <DeleteForeverIcon/>
            </IconButton>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
        </div>
    )
})