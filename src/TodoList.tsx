import React, {FC} from 'react'
import {FilterValuesType} from './App'



export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export const TodoList: FC<PropsType> = ({tasks, title, removeTask, changeFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map( obj => <li key={obj.id}>
                        <input type={'checkbox'} checked={obj.isDone}/>
                        <span>{obj.title}</span>
                        <button onClick={() => removeTask(obj.id)}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={ () => changeFilter('all')}>All</button>
                <button onClick={ () => changeFilter('active')}>Active</button>
                <button onClick={ () => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
