import React from "react";
import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved,
} from "../../../setupTestsReact";
import { store } from "../../../store";
import {
    TESTS_DELAY_ASYNC_INTERVAL_CALL,
    TESTS_DELAY_ASYNC_MAX,
} from "../../../constants";
import { Main } from "../../Main";

describe( "Users", () => {

    it( "check the first store user card exists", async () => {
        const { getByTestId } = render( <Main /> );
        await waitForElementToBeRemoved(
            () => screen.queryByTestId( "preloaderCircularProgress" ),
            {
                interval: TESTS_DELAY_ASYNC_INTERVAL_CALL,
                timeout : TESTS_DELAY_ASYNC_MAX,
            },
        );
        const state = store.getState();
        const usersId = Object.keys( state.users.users ?? {} );
        expect( usersId.length ).toBeGreaterThan( 0 );
        expect( getByTestId( `user${ usersId[ 0 ] }` ) ).toBeInTheDocument();
    } );

    it( "click on the first user card and check view all the user tasks", () => {
        const { getByTestId } = render( <Main /> );
        const state = store.getState();
        const usersId = Object.keys( state.users.users ?? {} );
        const theFirstStoreUserId = Number( usersId[ 0 ] );
        fireEvent.click( getByTestId( `user${ theFirstStoreUserId }` ) );
        const tasksId = Object.keys( state.tasks.tasks ?? {} )
            .map( idString => Number( idString ) );
        const tasksIdOfTheFirstStoreUser = tasksId.filter(
            taskId => state.tasks.tasks?.[ taskId ].userId === theFirstStoreUserId,
        );
        for ( const taskId of tasksIdOfTheFirstStoreUser ) {
            expect( getByTestId( `task${ taskId }` ) ).toBeInTheDocument();
        }
    } );

} );
