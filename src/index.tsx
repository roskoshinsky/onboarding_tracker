import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Main } from "./components/Main";
import { theme } from "./styles";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store } >
            <BrowserRouter>
                <ThemeProvider theme={ theme } >
                    <Main />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById( "root" ),
);
