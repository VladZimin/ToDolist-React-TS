import React, {ChangeEvent, FC} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from './components/EditableSpan'

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
    changeTodoTitle: (title: string, todoId: string) => void
    changeTaskTitle: (title: string, taskId: string, todoId: string) => void
    filter: FilterValuesType
    todoId: string
}
export const TodoList: FC<PropsType> = ({
                                            tasks, title,
                                            removeTask, removeTodoList,
                                            addTask, changeTaskStatus,
                                            changeFilter, filter,
                                            todoId, changeTodoTitle,
                                            changeTaskTitle
                                        }) => {
    const removeTodoListHandler = () => {
        removeTodoList(todoId)
    }
    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, todoId)
    }
    const changeTodoTitleHandler = (title: string) => {
        changeTodoTitle(title, todoId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoTitleHandler}/>
                <button onClick={removeTodoListHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    tasks.map(obj => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(obj.id, todoId, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(title, obj.id, todoId)
                        }

                        return (
                            <li key={obj.id} className={obj.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'}
                                       onChange={changeTaskStatusHandler}
                                       checked={obj.isDone}
                                />
                                <EditableSpan title={obj.title} onChange={changeTaskTitleHandler}/>
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

