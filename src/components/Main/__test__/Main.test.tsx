import React from "react";
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "../../../setupTestsReact";
import {
    TESTS_DELAY_ASYNC_INTERVAL_CALL,
    TESTS_DELAY_ASYNC_MAX,
} from "../../../constants";
import { Main } from "../Main";

describe( "Main", () => {

    it( "render preloader", () => {
        const { getByTestId } = render( <Main /> );
        expect( getByTestId( "preloaderCircularProgress" ) ).toBeInTheDocument();
    } );

    it( "render users and tasks header after loading", async () => {
        const { getByTestId } = render( <Main /> );
        await waitForElementToBeRemoved(
            () => screen.queryByTestId( "preloaderCircularProgress" ),
            {
                interval: TESTS_DELAY_ASYNC_INTERVAL_CALL,
                timeout : TESTS_DELAY_ASYNC_MAX,
            },
        );
        expect( getByTestId( "usersHeader" ) ).toBeInTheDocument();
        expect( getByTestId( "tasksHeader" ) ).toBeInTheDocument();
    } );

} );
