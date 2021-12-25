import { createTheme } from "@mui/material/styles";

export const theme = createTheme( {

    components: {

        MuiBackdrop: {
            styleOverrides: {
                root: {
                    alignItems    : "center",
                    display       : "inline-flex",
                    flexDirection : "column",
                    justifyContent: "center",
                },
            },
        },

        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: "white",
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily   : `"Helvetica", "Arial"`,
                    letterSpacing: 1,
                    overflow     : "hidden",
                    textOverflow : "ellipsis",
                },
            },
        },

    },

} );
