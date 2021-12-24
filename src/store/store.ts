import {
    Action,
    configureStore,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { reducer } from "./reducer";
import { RootState } from "./types";

export const store = configureStore( {
    reducer,
    devTools: process.env.NODE_ENV === "development",
} );

export type ThunkActionType = ThunkAction<void, RootState, unknown, Action>;
