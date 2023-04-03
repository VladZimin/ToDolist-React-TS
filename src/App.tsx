import React, {useState} from 'react'
import './App.css'
import {TaskType, TodoList} from './TodoList'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'JS', isDone: false},
        {id: 2, title: 'React', isDone: true},
        {id: 3, title: 'CSS/HTML', isDone: false},
        {id: 4, title: 'Redux', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(obj => obj.id !== id))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForList = tasks
    if (filter === 'active') {
        tasksForList = tasks.filter(obj => !obj.isDone)
    }

    if (filter === 'completed') {
        tasksForList = tasks.filter(obj => obj.isDone)
    }
    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
