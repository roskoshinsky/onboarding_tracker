import { combineReducers } from "@reduxjs/toolkit";
import { reducer as tasksReducer } from "../components/Tasks";
import { reducer as usersReducer } from "../components/Users";

export const reducer = combineReducers( {
    tasks: tasksReducer,
    users: usersReducer,
} );
