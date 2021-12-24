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
    UserListType,
    UsersHashType,
    UsersState,
    isUserInterface,
} from "./UsersTypes";
import {
    USERS_REST_URL_GET,
    USERS_TEXT_ERROR_DATA,
    USERS_TEXT_ERROR_USER_EXISTS,
} from "./UsersConstants";

export const usersInitialState: UsersState = {
    ...asyncInterfaceInitial,
};

export const usersSlice = createSlice( {

    name        : "users",
    initialState: usersInitialState,

    reducers: {

        ...asyncInterfaceReducers(),

        userIdSelectedSet ( state, { payload }: PayloadAction<UsersState["userIdSelected"]> ) {
            state.userIdSelected = Number( payload );
        },

        usersSet ( state, { payload }: PayloadAction<UsersState["users"]> ) {
            state.users = payload;
        },

    },

} );

export const usersActions = usersSlice.actions;

export const usersLoadAction = (): ThunkActionType => async ( dispatch, getState ) => {
    try {
        if ( getState().users.isLoading ) {
            return;
        }
        dispatch( usersActions.errorReset() );
        dispatch( usersActions.loadingSet( true ) );
        const response = await delayRandom( fetch, USERS_REST_URL_GET );
        if ( !response.ok ) {
            throw Error( TEXT_NETWORK_ERROR );
        }
        const list: UserListType = await response.json();
        const users = Object.create( null ) as UsersHashType;
        for ( const userFromList of list ) {
            const user = Object.assign( Object.create( null ), userFromList );
            if ( !isUserInterface( user ) ) {
                throw Error( USERS_TEXT_ERROR_DATA );
            }
            if ( user.id in users ) {
                throw Error( USERS_TEXT_ERROR_USER_EXISTS );
            }
            users[ user.id ] = user;
        }
        dispatch( usersActions.usersSet( users ) );
        dispatch( usersActions.readySet( true ) );
    } catch ( error ) {
        if ( error instanceof Error ) {
            dispatch( usersActions.errorSet( error.message ) );
        } else {
            dispatch( usersActions.errorSet( String( error ) ) );
        }
    } finally {
        dispatch( usersActions.loadingSet( false ) );
    }
};

export const { reducer } = usersSlice;

export const usersSelector = ( state: RootState ) => state.users;

export const usersSelectorError = ( state: RootState ) => state.users.error;

export const usersSelectorHasError = ( state: RootState ) => state.users.hasError;

export const usersSelectorIsLoading = ( state: RootState ) => state.users.isLoading;

export const usersSelectorIsReady = ( state: RootState ) => state.users.isReady;

export const usersSelectorUserIdSelected = ( state: RootState ) => state.users.userIdSelected;

export const usersSelectorUsers = ( state: RootState ) => state.users.users;
