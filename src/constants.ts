import { PayloadAction } from "@reduxjs/toolkit";
import { AsyncInterface } from "./types";

export const asyncInterfaceInitial: AsyncInterface = {
    error    : undefined,
    hasError : false,
    isLoading: false,
    isReady  : false,
};

export const asyncInterfaceReducers = <T extends AsyncInterface>() => ( {

    errorReset ( state: T ) {
        state.hasError = false;
        state.error = undefined;
    },

    errorSet ( state: T, { payload }: PayloadAction<string> ) {
        state.hasError = true;
        state.error = payload;
    },

    loadingSet ( state: T, { payload }: PayloadAction<boolean> ) {
        state.isLoading = payload;
    },

    readySet ( state: T, { payload }: PayloadAction<boolean> ) {
        state.isReady = payload;
    },

} );

export const TESTS_DELAY_ASYNC_INTERVAL_CALL = 500;
export const TESTS_DELAY_ASYNC_MAX = 5000;
export const TEXT_ERROR = "Error";
export const TEXT_NETWORK_ERROR = "Error data loading";
