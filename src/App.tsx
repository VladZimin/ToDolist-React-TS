import React, {useState} from 'react'
import './App.css'
import {TaskType, TodoList} from './TodoList'
import {v1} from 'uuid'

const todoListId1 = v1()
const todoListId2 = v1()

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type AllTasksType = {
    [key: string]: TaskType[]
}
function App() {

    const [allTasks, setAllTasks] = useState<AllTasksType>({
            [todoListId1]: [
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'CSS/HTML', isDone: false},
                {id: v1(), title: 'Redux', isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Banana', isDone: false},
                {id: v1(), title: 'Cheese', isDone: false},
            ]
        })
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])
    const removeTask = (id: string, todoId: string) => {
        setAllTasks({...allTasks, [todoId]: allTasks[todoId].filter(obj => obj.id !== id)})
    }
    const addTask = (title: string, todoId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setAllTasks({...allTasks, [todoId]: [newTask, ...allTasks[todoId]]})
    }
    const changeTaskStatus = (taskId: string, todoId: string, isDone: boolean) => {
        const changedTask = allTasks[todoId].find( obj => obj.id === taskId)
        if (changedTask) changedTask.isDone = isDone
        setAllTasks({...allTasks})
    }
    const changeFilter = (value: FilterValuesType, todoId: string) => {
        setTodoLists(todoLists.map(obj => obj.id === todoId ? {...obj, filter: value} : obj))
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(obj => obj.id !== todoId))
        delete allTasks[todoId]
        setAllTasks({...allTasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(obj => {
                    let tasksForList = allTasks[obj.id]
                    if (obj.filter === 'active') {
                        tasksForList = tasksForList.filter(obj => !obj.isDone)
                    }

                    if (obj.filter === 'completed') {
                        tasksForList = tasksForList.filter(obj => obj.isDone)
                    }
                    return (
                        <TodoList
                            key={obj.id}
                            todoId={obj.id}
                            title={obj.title}
                            tasks={tasksForList}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeFilter={changeFilter}
                            filter={obj.filter}
                        />
                    )
                })
            }
        </div>
    )
}

export default App
