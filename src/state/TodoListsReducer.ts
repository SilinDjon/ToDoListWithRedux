import {todolistAPI, TodolistType} from "../api/Todolist-api";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state = initialState, action: tsarType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case "ADD-TODO-LIST": {
            return [{...action.payload.newTodolistTitle, filter: 'All'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((t) => t.id === action.payload.todolistId2 ? {
                ...t,
                title: action.payload.newTodolistTitle
            } : t)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((t) => t.id === action.payload.todolistId2 ? {...t, filter: action.payload.newFilter} : t)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'All'
            }))
        }

        default: return state
    }
}

export type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType | SetTodolistsActionType
export type  removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId1
        }
    } as const
}


export type  addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: TodolistType) => {
    return {
        type: 'ADD-TODO-LIST',
        payload: {
            newTodolistTitle
        }
    } as const
}

type  changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (newTodolistTitle: string, todolistId2: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTodolistTitle,
            todolistId2
        }
    } as const
}

type  changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (newFilter: FilterValuesType, todolistId2: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    } as const
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (newTodolistTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(newTodolistTitle)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const removeTodolistTC = (todolistId1: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId1)
        .then((res) => {
            dispatch(removeTodoListAC(todolistId1))
        })
}

export const changeTodolistTitleTC = (newTodolistTitle: string, todolistId2: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(newTodolistTitle, todolistId2)
        .then((res) => {
            dispatch(changeTodoListTitleAC(newTodolistTitle,todolistId2))
        })
}
