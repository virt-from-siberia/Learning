import { combineReducers, configureStore, createSlice, PayloadAction, getDefaultMiddleware, Dispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { v1 as uuid } from "uuid";
import logger from 'redux-logger'

import { Todo } from "./type";

const todosInitialState: Todo[] = [
    {
        id: uuid(),
        desc: "Learn React",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux-ToolKit",
        isComplete: false
    }
];

const todosSlice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
    reducers: {
        create: {
            reducer: (state, { payload }:
                PayloadAction<{ id: string, desc: string, isComplete: boolean }>) => {
                state.push(payload)
            },
            prepare: ({ desc }: { desc: string }) => ({
                payload: {
                    id: uuid(),
                    desc,
                    isComplete: false
                }
            })
        },
        edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
            const todoEdit = state.find(todo => todo.id === payload.id)
            if (todoEdit) {
                todoEdit.desc = payload.desc
            }
        },
        toggle: (state, { payload }: PayloadAction<{ id: string; isComplete: boolean }>) => {
            const todoToggle = state.find(todo => todo.id === payload.id)
            if (todoToggle) {
                todoToggle.isComplete = payload.isComplete
            }
        },
        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === payload.id)
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
})


const selectedTodoSlice = createSlice({
    name: 'selectedTodo',
    initialState: null as string | null,
    reducers: {
        select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id
    }
})


export const getUsers = createAsyncThunk(
    'users/fetchById',
    (userId: number) => {
        return fetch(`https://reeeeeeqres.in/api/users/${userId}`).then(response => {
            return response.json()
        })
    }
)


// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        success: false,
        loading: false,
        error: false,
        data: []
    },
    reducers: {
    },
    extraReducers: {
        [getUsers.pending.toString()]: state => {
            state.loading = true
        },
        [getUsers.rejected.toString()]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getUsers.fulfilled.toString()]: (state, { payload }) => {
            state.success = true;
            state.loading = false;
            state.data = payload.data
        },
    },
})



const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
    },
    extraReducers: {
        [todosSlice.actions.create.type]: state => state + 1,
        [todosSlice.actions.edit.type]: state => state + 1,
        [todosSlice.actions.toggle.type]: state => state + 1,
        [todosSlice.actions.remove.type]: state => state + 1,
    }
})


export const {
    create: createTodoActionCreator,
    edit: editTodoActionCreator,
    toggle: toggleTodoActionCreator,
    remove: deleteTodoActionCreator
} = todosSlice.actions

export const {
    select: selectTodoActionCreator
} = selectedTodoSlice.actions

const reducer = combineReducers({
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer,
    users: usersSlice.reducer
})

const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
    reducer,
    middleware,
})