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
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export const TodoList: FC<PropsType> = ({
                                            tasks,
                                            title, removeTask,
                                            changeFilter, addTask,
                                            changeTaskStatus, filter
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
        if (trimmedValue) addTask(trimmedValue)
        else setError('Title is required!')
        setInputValue('')
    }

    return (
        <div>
            <h3>{title}</h3>
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
                            changeTaskStatus(obj.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={obj.id} className={obj.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'}
                                       onChange={changeTaskStatusHandler}
                                       checked={obj.isDone}
                                />
                                <span>{obj.title}</span>
                                <button onClick={() => removeTask(obj.id)}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}
                        className={filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={() => changeFilter('active')}
                        className={filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={() => changeFilter('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}
