import {FilterValuesType} from "../state/TodoListsReducer";


type PropsType = {
    name: string,
    callBack: () => void,
    filter?: FilterValuesType
}

export const Button = (props: PropsType) => {
    return (
        <button className={props.filter === props.name ? 'activeFilter' : ''}
                onClick={props.callBack}>{props.name}</button>
    )
}