import React, {ChangeEvent, FC} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from './components/EditableSpan'
import {Button, Checkbox, IconButton} from '@mui/material'
import {Bookmark, BookmarkBorder, DeleteForeverTwoTone, HighlightOffTwoTone} from '@mui/icons-material'

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
                <IconButton onClick={removeTodoListHandler}>
                    <HighlightOffTwoTone color={'error'}/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {
                    tasks.map(obj => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(obj.id, todoId, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(title, obj.id, todoId)
                        }

                        return (
                            <div key={obj.id}>
                                <Checkbox
                                    onChange={changeTaskStatusHandler}
                                    checked={obj.isDone}
                                    icon={<BookmarkBorder/>}
                                    checkedIcon={<Bookmark/>}
                                />
                                <EditableSpan style={obj.isDone ? 'is-done' : ''} title={obj.title}
                                              onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={() => removeTask(obj.id, todoId)}>
                                    <DeleteForeverTwoTone color={'error'}/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button onClick={() => changeFilter('all', todoId)}
                        variant={filter === 'all' ? 'contained' : 'outlined'}>All</Button>
                <Button onClick={() => changeFilter('active', todoId)}
                        variant={filter === 'active' ? 'contained' : 'outlined'}>Active</Button>
                <Button onClick={() => changeFilter('completed', todoId)}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            </div>
        </div>
    )
}

