import React, {ChangeEvent, FC} from 'react'
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from './components/EditableSpan'
import {Button, Checkbox, IconButton} from '@mui/material'
import {Bookmark, BookmarkBorder, DeleteForeverTwoTone, HighlightOffTwoTone} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {changeTodoListFilter, changeTodoListTitle, removeTodoList, TodoListType} from './state/todoList-reducer'
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, TaskType} from './state/tasks-reducer'


type PropsType = {
    todoList: TodoListType
}
export const TodoList: FC<PropsType> = ({todoList}) => {

    const {id, title, filter} = todoList
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const removeTodoListHandler = () => {
       dispatch(removeTodoList(id))
    }
    const addTaskHandler = (taskTitle: string) => {
        dispatch(addTask(taskTitle, id))
    }
    const changeTodoTitleHandler = (title: string) => {
        dispatch(changeTodoListTitle(id, title))
    }

    if (filter === 'active') {
        tasks = tasks.filter(obj => !obj.isDone)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(obj => obj.isDone)
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
                            dispatch(changeTaskStatus(obj.id,  e.currentTarget.checked, id))
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitle( obj.id, title, id))
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
                                <IconButton onClick={() => dispatch(removeTask(obj.id, id))}>
                                    <DeleteForeverTwoTone color={'error'}/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button onClick={() => dispatch(changeTodoListFilter(id, 'all'))}
                        variant={filter === 'all' ? 'contained' : 'outlined'}>All</Button>
                <Button onClick={() => dispatch(changeTodoListFilter(id, 'active'))}
                        variant={filter === 'active' ? 'contained' : 'outlined'}>Active</Button>
                <Button onClick={() => dispatch(changeTodoListFilter(id, 'completed'))}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            </div>
        </div>
    )
}

