
import {v1} from 'uuid'
import {AddTodoListActionType, RemoveTodoListActionType} from './todoList-reducer'

type RemoveTaskActionType = ReturnType<typeof removeTask>
type AddTaskActionType = ReturnType<typeof addTask>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type AllTasksType = {
    [key: string]: TaskType[]
}

const initState: AllTasksType = {}

export const tasksReducer = (state = initState, action: ActionsType): AllTasksType => {

    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD_TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE_TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}

export const removeTask = (taskId: string, todolistId: string) => ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const addTask = (title: string, todolistId: string) => ({type: 'ADD_TASK', title, todolistId} as const)
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE_TASK_STATUS',
    taskId,
    isDone,
    todolistId
} as const)
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE_TASK_TITLE',
    taskId,
    title,
    todolistId
} as const)
