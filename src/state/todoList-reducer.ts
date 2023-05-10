import {FilterValuesType, TodoListType} from '../App'
import {v1} from 'uuid'

export type AddTodoListActionType =  ReturnType<typeof addTodoList>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
type ChangeTodoListTitleActionType =  ReturnType<typeof changeTodoListTitle>
type ChangeTodoListFilterActionType =  ReturnType<typeof changeTodoListFilter>

type ActionsType =
    AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
export const todoListReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(obj => obj.id !== action.todolistId)
        case 'ADD_TODOLIST': {
            const newTodoList: TodoListType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [
                ...state,
                newTodoList
            ]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const todoList = state.find(obj => obj.id === action.todolistId)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            const todoList = state.find(obj => obj.id === action.todolistId)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodoList = (todolistId: string) => ({type: 'REMOVE_TODOLIST', todolistId} as const)
export const addTodoList = (title: string) => ({type: 'ADD_TODOLIST', title, todolistId: v1()} as const)
export const changeTodoListTitle = (todolistId: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    title
} as const)
export const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    todolistId,
    filter
} as const)