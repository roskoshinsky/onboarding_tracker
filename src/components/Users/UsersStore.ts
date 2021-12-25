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

export const usersLoad = (): ThunkActionType => async ( dispatch, getState ) => {
    try {
        if ( getState().users.isLoading ) {
            return;
        }
        dispatch( usersSlice.actions.errorReset() );
        dispatch( usersSlice.actions.loadingSet( true ) );
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
        dispatch( usersSlice.actions.usersSet( users ) );
        dispatch( usersSlice.actions.readySet( true ) );
    } catch ( error ) {
        if ( error instanceof Error ) {
            dispatch( usersSlice.actions.errorSet( error.message ) );
        } else {
            dispatch( usersSlice.actions.errorSet( String( error ) ) );
        }
    } finally {
        dispatch( usersSlice.actions.loadingSet( false ) );
    }
};

export const usersActions = {
    ...usersSlice.actions,
    usersLoad,
};

export const { reducer } = usersSlice;

export const usersSelectors = {
    error         : ( state: RootState ) => state.users.error,
    hasError      : ( state: RootState ) => state.users.hasError,
    isLoading     : ( state: RootState ) => state.users.isLoading,
    isReady       : ( state: RootState ) => state.users.isReady,
    root          : ( state: RootState ) => state.users,
    userIdSelected: ( state: RootState ) => state.users.userIdSelected,
    users         : ( state: RootState ) => state.users.users,
};
