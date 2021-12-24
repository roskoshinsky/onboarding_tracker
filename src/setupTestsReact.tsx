// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { FC } from "react";
import { render as renderRTL } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { theme } from "./styles";
import { ArgumentTypes } from "./utils";

const Wrapper: FC = ( { children } ) => (
    <Provider store={ store } >
        <BrowserRouter>
            <ThemeProvider theme={ theme } >
                { children }
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

const render = ( ...args: ArgumentTypes<typeof renderRTL> ) => {
    args[ 0 ] = <Wrapper>{ args[ 0 ] }</Wrapper>;
    return renderRTL.apply( null, args );
};

export * from "@testing-library/react";

export { render };
