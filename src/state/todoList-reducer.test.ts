import {v1} from 'uuid'
import {FilterValuesType, TodoListType} from '../App'
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    todoListReducer
} from './todoList-reducer'

let todoID1: string
let todoID2: string

let currentState: TodoListType[]

beforeEach(() => {
    todoID1 = v1()
    todoID2 = v1()
    currentState= [
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todoList should be removed', () => {
    const newState = todoListReducer(currentState, removeTodoList(todoID1))
    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(todoID2)
})
test('correct todoList should be added', () => {

    const newTitle = 'Read'
    const newState = todoListReducer(currentState, addTodoList(newTitle))

    expect(newState.length).toBe(3)
    expect(newState[2].title).toBe(newTitle)
    expect(newState[2].filter).toBe('all')
})
test('correct todoList should change its title', () => {

    const newTitle = 'Read'
    const newState = todoListReducer(currentState, changeTodoListTitle(todoID2, newTitle))

    expect(newState[0].title).toBe('What to learn')
    expect(newState[1].title).toBe(newTitle)
})
test('correct todoList should change its filter', () => {

    const newFilter: FilterValuesType = 'completed'
    const newState = todoListReducer(currentState, changeTodoListFilter(todoID2, newFilter))

    expect(newState[0].filter).toBe('all')
    expect(newState[1].filter).toBe(newFilter)
})