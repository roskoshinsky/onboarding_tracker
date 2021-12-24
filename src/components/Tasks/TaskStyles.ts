import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const TasksStyled = styled( Grid )( {

    "> div:nth-of-type(even)": {
        backgroundColor: "#f0f0f0",
    },

    "> div > div": {
        flexWrap: "nowrap",
    },

    "> div > div > div:nth-of-type(2)": {
        alignSelf: "center",
    },

} );

export const TasksPosterStyled = styled( Typography )( {

    backgroundColor: "#f0f0f0",
    padding        : 20,

} );
