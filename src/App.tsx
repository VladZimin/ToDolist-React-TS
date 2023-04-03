import React, {useState} from 'react'
import './App.css'
import {TaskType, TodoList} from './TodoList'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'CSS/HTML', isDone: false},
        {id: v1(), title: 'Redux', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        setTasks(tasks.filter(obj => obj.id !== id))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
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
                addTask={addTask}
            />
        </div>
    )
}

export default App
