import {
    PayloadAction,
    createSlice,
} from "@reduxjs/toolkit";
import { delayRandom } from "../../utils";
import {
    RootState,
    ThunkActionType,
} from "../../store";
import {
    TEXT_NETWORK_ERROR,
    asyncInterfaceInitial,
    asyncInterfaceReducers,
} from "../../constants";
import {
    TaskInterface,
    TaskListType,
    TasksHashType,
    TasksState,
    UserToTasksHashType,
    isTaskInterface,
} from "./TasksTypes";
import {
    TASKS_REST_URL_GET,
    TASKS_TEXT_ERROR_DATA,
    TASKS_TEXT_ERROR_TASK_EXISTS,
} from "./TasksConstants";

export const tasksInitialState: TasksState = {
    ...asyncInterfaceInitial,
};

export const tasksSlice = createSlice( {

    name        : "tasks",
    initialState: tasksInitialState,

    reducers: {

        ...asyncInterfaceReducers(),

        taskComplete ( state, { payload }: PayloadAction<number> ) {
            const task = state.tasks?.[ payload ];
            if ( task ) {
                task.completed = true;
            }
        },

        tasksSet ( state, { payload }: PayloadAction<TasksState["tasks"]> ) {
            state.tasks = payload;
        },

        userToTasksHashCreate ( state ) {
            if ( !state.tasks ) {
                return;
            }
            const userToTasks = Object.create( null ) as UserToTasksHashType;
            for ( const taskId of Object.keys( state.tasks ) ) {
                const taskIdNumber = Number( taskId );
                if ( !( taskIdNumber in state.tasks ) ) {
                    continue;
                }
                const task: TaskInterface = state.tasks[ taskIdNumber ];
                const { userId } = task;
                if ( !( userId in userToTasks ) ) {
                    userToTasks[ userId ] = [];
                }
                userToTasks[ userId ].push( task.id );
            }
            state.userToTasks = userToTasks;
        },

    },

} );

export const tasksLoad = (): ThunkActionType => async ( dispatch, getState ) => {
    try {
        if ( getState().tasks.isLoading ) {
            return;
        }
        dispatch( tasksSlice.actions.errorReset() );
        dispatch( tasksSlice.actions.loadingSet( true ) );
        const response = await delayRandom( fetch, TASKS_REST_URL_GET );
        if ( !response.ok ) {
            throw Error( TEXT_NETWORK_ERROR );
        }
        const list: TaskListType = await response.json();
        const tasks = Object.create( null ) as TasksHashType;
        for ( const taskFromList of list ) {
            const task = Object.assign( Object.create( null ), taskFromList );
            if ( !isTaskInterface( task ) ) {
                throw Error( TASKS_TEXT_ERROR_DATA );
            }
            if ( task.id in tasks ) {
                throw Error( TASKS_TEXT_ERROR_TASK_EXISTS );
            }
            tasks[ task.id ] = task;
        }
        dispatch( tasksSlice.actions.userToTasksHashCreate() );
        dispatch( tasksSlice.actions.tasksSet( tasks ) );
        dispatch( tasksSlice.actions.readySet( true ) );
    } catch ( error ) {
        if ( error instanceof Error ) {
            dispatch( tasksSlice.actions.errorSet( error.message ) );
        } else {
            dispatch( tasksSlice.actions.errorSet( String( error ) ) );
        }
    } finally {
        dispatch( tasksSlice.actions.loadingSet( false ) );
    }
};

export const tasksActions = {
    ...tasksSlice.actions,
    tasksLoad,
};

export const { reducer } = tasksSlice;

export const tasksSelectors = {
    error    : ( state: RootState ) => state.tasks.error,
    hasError : ( state: RootState ) => state.tasks.hasError,
    isLoading: ( state: RootState ) => state.tasks.isLoading,
    isReady  : ( state: RootState ) => state.tasks.isReady,
    root     : ( state: RootState ) => state.tasks,
    tasks    : ( state: RootState ) => state.tasks.tasks,
};
