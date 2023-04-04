import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react'
import {FilterValuesType} from './App'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoId: string) => void
    removeTodoList: (todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, todoId: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType, todoId: string) => void
    filter: FilterValuesType
    todoId: string
}
export const TodoList: FC<PropsType> = ({
                                            tasks, title,
                                            removeTask, removeTodoList,
                                            addTask, changeTaskStatus,
                                            changeFilter, filter,
                                            todoId
                                        }) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.ctrlKey && e.key === 'Enter' && addTaskHandler()
    }
    const addTaskHandler = () => {
        const trimmedValue = inputValue.trim()
        if (trimmedValue) addTask(trimmedValue, todoId)
        else setError('Title is required!')
        setInputValue('')
    }
    const removeTodoListHandler = () => {
        removeTodoList(todoId)
    }

    return (
        <div>
            <h3>{title} <button onClick={removeTodoListHandler}>X</button></h3>
            <div>
                <input onChange={changeInputHandler}
                       onKeyDown={keyDownHandler}
                       value={inputValue}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                <div className={'error-message'}>{error}</div>
            </div>
            <ul>
                {
                    tasks.map(obj => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(obj.id, todoId, e.currentTarget.checked)
                        }

                        return (
                            <li key={obj.id} className={obj.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'}
                                       onChange={changeTaskStatusHandler}
                                       checked={obj.isDone}
                                />
                                <span>{obj.title}</span>
                                <button onClick={() => removeTask(obj.id, todoId)}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('all', todoId)}
                        className={filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={() => changeFilter('active', todoId)}
                        className={filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={() => changeFilter('completed', todoId)}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}
