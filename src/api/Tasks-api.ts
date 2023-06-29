
import {instance, TaskPriorities, TaskStatuses} from "./Todolist-api";


export type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T

}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

 export type UpdateTaskModalType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type GetTaskResponse = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}





export const TasksApi = {
    getTask(todolistId: string) {
        const promise = instance.get<GetTaskResponse>(
            `todo-lists/${todolistId}/tasks`,
        )
        return promise
    },

    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseTaskType<{item: TaskType}>>(
            `todo-lists/${todolistId}/tasks`, {title: title}
        )
        return promise
    },

    deleteTask(taskId: string, todolistId: string) {
        const promise = instance.delete<ResponseTaskType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,

    )
        console.log(promise)
        return promise
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModalType) {
        const promise = instance.put<ResponseTaskType<UpdateTaskModalType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model
        )
        console.log(promise)
        return promise
    },

}




