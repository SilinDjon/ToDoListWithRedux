import {addTodoListACType, removeTodoListACType, SetTodolistsActionType} from "./TodoListsReducer";
import {TasksStateType} from "../AppWithRedux";
import {TasksApi, TaskType, UpdateTaskModalType} from "../api/Tasks-api";
import {Dispatch} from "redux";
import {TaskStatuses} from "../api/Todolist-api";
import {AppRootStateType} from "./store";


export type ActionsType =
    removeTasksACType
    | addTasksACType
    | changeStatusACType
    | changeTaskTitleACType
    | addTodoListACType
    | removeTodoListACType
    | SetTodolistsActionType
    | SetTasksActionType
    | updateTaskACType


const initialState: TasksStateType = {}

export const TasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            console.log(action.payload.todoListId)
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(tasks => tasks.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.task.todoListId];
            const newTasks = [action.payload.task, ...tasks];
            stateCopy[action.payload.task.todoListId] = newTasks;

            return stateCopy;
        }

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    status: action.payload.eventStatus
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map((t) => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case 'SET-TASKS': {
            const {todoListId, tasks} = action.payload
            return {...state, [todoListId]: tasks}
        }

        case "ADD-TODO-LIST":
            return {...state, [action.payload.newTodolistTitle.id]: []}

        case "REMOVE-TODOLIST":
            const copy = {...state}
            delete copy[action.payload.todolistId1]
            return copy

        default:
            return state

    }
}

type removeTasksACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type addTasksACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            task
        }
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, model: UpdateTaskModalType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)


type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (taskID: string, eventStatus: TaskStatuses, todoListId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            taskID,
            eventStatus,
            todoListId
        }
    } as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID,
            title,
            todoListId
        }
    } as const
}

export type SetTasksActionType = ReturnType<typeof SetTasksAC>

export const SetTasksAC = (todoListId: string,tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoListId,
            tasks
        }
    } as const
}


export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    TasksApi.getTask(todoListId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(SetTasksAC(todoListId, tasks))
        })
}

export const removeTaskTC = (taskID: string, todoListId: string) => (dispatch: Dispatch) => {
    TasksApi.deleteTask(taskID, todoListId)
        .then((res) => {
            console.log(taskID, todoListId)
            dispatch(removeTaskAC(taskID, todoListId))
        })
}

export const addTaskTC = (todoListId: string, title: string, ) => (dispatch: Dispatch) => {
    TasksApi.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(todoListId, res.data.data.item))
        })
}

export const updateTaskStatusTC = (taskId: string, model: UpdateTaskModalType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todoListId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            TasksApi.updateTask(todoListId, taskId, {
                ...task, ...model
            }).then(() => {
                const action = updateTaskAC(taskId, model, todoListId)
                dispatch(action)
            })
        }
    }
}