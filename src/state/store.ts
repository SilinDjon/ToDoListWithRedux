import { TasksReducer } from './TasksReducer'
import { todoListsReducer } from './TodoListsReducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkDispatch} from "redux-thunk";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: todoListsReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store