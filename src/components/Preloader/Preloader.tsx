import {
    memo,
} from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TEXT_ERROR } from "../../constants";
import { PRELOADER_TEXT_TRY_AGAIN } from "./PreloaderConstants";
import { PreloaderProps } from "./PreloaderTypes";

export const Preloader = memo( ( {
    error,
    hasError,
    onTryAgain,
}: PreloaderProps ) => {

    if ( hasError ) {
        return (
            <Backdrop
                open
            >
                {
                    error
                        ? (
                            <Typography
                                color="white"
                                component="div"
                                fontWeight={ 200 }
                                m={ 2 }
                            >
                                { error }
                            </Typography>
                        )
                        : (
                            <Typography
                                color="white"
                                component="div"
                                fontWeight={ 200 }
                                m={ 2 }
                            >
                                { TEXT_ERROR }
                            </Typography>
                        )
                }
                {
                    onTryAgain
                        ? (
                            <Button
                                variant="contained"
                                onClick={ onTryAgain }
                            >
                                { PRELOADER_TEXT_TRY_AGAIN }
                            </Button>
                        )
                        : null
                }
            </Backdrop>
        );
    }

    return (
        <Backdrop open >
            <CircularProgress data-testid="preloaderCircularProgress" />
        </Backdrop>
    );

} );
