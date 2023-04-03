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
}
export const TodoList: FC<PropsType> = ({tasks,
                                            title, removeTask,
                                            changeFilter, addTask}) => {

    const [inputValue, setInputValue] = useState<string>('')

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.ctrlKey && e.key === 'Enter' && addTaskHandler()
    }
    const addTaskHandler = () => {
        addTask(inputValue)
        setInputValue('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={changeInputHandler}
                       onKeyDown={keyDownHandler}
                       value={inputValue}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map(obj => <li key={obj.id}>
                        <input type={'checkbox'} checked={obj.isDone}/>
                        <span>{obj.title}</span>
                        <button onClick={() => removeTask(obj.id)}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
