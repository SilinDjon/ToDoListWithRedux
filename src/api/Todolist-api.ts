import axios from 'axios'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D

}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'b507b6de-255b-42c1-938c-dd32c3ae1ad0',
    },
})

export const todolistAPI = {
    updateTodolist( title: string, todolistId: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
        { title: title },
    )
        return promise
    },

    getTodolists() {
        const promise = instance.get<TodolistType[]>(
            `todo-lists/`,
        )
        return promise
    },

    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>(
            `todo-lists/`, {title: title},
        )
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
        )
        return promise
    },
}




