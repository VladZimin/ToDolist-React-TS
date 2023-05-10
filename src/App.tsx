import React from 'react'
import './App.css'
import {TodoList} from './TodoList'
import {AddItemForm} from './components/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {addTodoList, TodoListType} from './state/todoList-reducer'




function App() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const dispatch = useDispatch()

    const addTodoListCallBack = (title: string) => {
        dispatch(addTodoList(title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoListCallBack}/>
                </Grid>
                <Grid container spacing={2}>
                    {
                        todoLists.map(obj => {
                            return (
                                <Grid item key={obj.id}>
                                    <Paper elevation={2} style={{padding: '10px'}}>
                                        <TodoList
                                            todoList={obj}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App
