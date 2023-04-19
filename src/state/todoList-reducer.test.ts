import {v1} from 'uuid'
import {FilterValuesType, TodoListType} from '../App'
import {
    AddTodoList,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoList,
    todoListReducer
} from './todoList-reducer'

test('correct todoList should be removed', () => {
    const todoID1 = v1()
    const todoID2 = v1()

    const currentState: TodoListType[] = [
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'}
    ]

    const newState = todoListReducer(currentState, RemoveTodoList(todoID1))

    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(todoID2)
})
test('correct todoList should be added', () => {
    const todoID1 = v1()
    const todoID2 = v1()
    const newTitle = 'Read'

    const currentState: TodoListType[] = [
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'}
    ]

    const newState = todoListReducer(currentState, AddTodoList(newTitle))

    expect(newState.length).toBe(3)
    expect(newState[2].title).toBe(newTitle)
    expect(newState[2].filter).toBe('all')
})
test('correct todoList should change its title', () => {
    const todoID1 = v1()
    const todoID2 = v1()
    const newTitle = 'Read'

    const currentState: TodoListType[] = [
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'}
    ]

    const newState = todoListReducer(currentState, ChangeTodoListTitle(todoID2, newTitle))

    expect(newState[0].title).toBe('What to learn')
    expect(newState[1].title).toBe(newTitle)
})
test('correct todoList should change its filter', () => {
    const todoID1 = v1()
    const todoID2 = v1()
    const newFilter: FilterValuesType = 'completed'

    const currentState: TodoListType[] = [
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'}
    ]

    const newState = todoListReducer(currentState, ChangeTodoListFilter(todoID2, newFilter))

    expect(newState[0].filter).toBe('all')
    expect(newState[1].filter).toBe(newFilter)
})