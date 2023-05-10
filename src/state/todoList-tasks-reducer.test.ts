import {AllTasksType, TodoListType} from '../App'
import {addTodoList, todoListReducer} from './todoList-reducer'
import {tasksReducer} from './tasks-reducer'

test('ids should be equals', () => {
    const startTasksState: AllTasksType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodoList('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
