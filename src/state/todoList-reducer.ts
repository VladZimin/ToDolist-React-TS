import {FilterValuesType, TodoListType} from '../App'
import {v1} from 'uuid'

type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType =
    AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
export const todoListReducer = (initState: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return initState.filter(obj => obj.id !== action.id)
        case 'ADD_TODOLIST': {
            const newTodoList: TodoListType = {id: v1(), title: action.title, filter: 'all'}
            return [
                ...initState,
                newTodoList
            ]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const todoList = initState.find(obj => obj.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...initState]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            const todoList = initState.find(obj => obj.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...initState]
        }
        default:
            return initState
    }
}

export const RemoveTodoList = (id: string): RemoveTodoListActionType => ({type: 'REMOVE_TODOLIST', id})
export const AddTodoList = (title: string): AddTodoListActionType => ({type: 'ADD_TODOLIST', title})
export const ChangeTodoListTitle = (id: string, title: string): ChangeTodoListTitleActionType => ({
    type: 'CHANGE_TODOLIST_TITLE',
    id,
    title
})
export const ChangeTodoListFilter = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id,
    filter
})