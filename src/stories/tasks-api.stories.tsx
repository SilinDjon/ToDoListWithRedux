import React, {ChangeEvent, useEffect, useState} from 'react'
import {TasksApi} from "../api/Tasks-api";


export default {
    title: 'API-TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '2ec3b8c7-a762-4220-a329-94be77ec79ba'
        TasksApi.getTask(todoListId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)
    const taskTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    const createTaskHandler = () => {
        TasksApi.createTask(todoListId, title)
            .then(res => {
                setState(res.data.data.item)
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoListId} onChange={todoIdInputHandler} placeholder={"Enter todoList ID"}/>
        <input value={title} onChange={taskTitleInputHandler} placeholder={"Enter task title"}/>
        <div>
            <button onClick={createTaskHandler}>Create task</button>
        </div>
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const taskIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

    const deleteTaskHandler = () => {
        TasksApi.deleteTask(todoListId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState('task deleted')
                }
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoListId} onChange={todoIdInputHandler} placeholder={"Enter todoList ID"}/>
        <input value={taskId} onChange={taskIdInputHandler} placeholder={"Enter task ID"}/>
        <div>
            <button onClick={deleteTaskHandler}>Delete task</button>
        </div>
    </>
}

