import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

export const UserGridStyled = styled( Grid )( (
    { selected }: { selected?: boolean },
) => ( {

    "backgroundColor": selected ? "#cfd7d0" : "",
    "cursor"         : "pointer",

    ":hover": {
        backgroundColor: selected ? "#cfd7d0" : "#f0f0f0",
    },

} ) );
