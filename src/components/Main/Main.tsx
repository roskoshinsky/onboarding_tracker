import {
    memo,
    useCallback,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Preloader } from "../Preloader";
import {
    Users,
    usersLoadAction,
    usersSelectorError,
    usersSelectorHasError,
    usersSelectorIsLoading,
} from "../Users";
import {
    Tasks,
    tasksLoadAction as loadTasksAction,
    tasksSelectorError,
    tasksSelectorHasError,
    tasksSelectorIsLoading,
} from "../Tasks";
import { MAIN_TEXT_HEADER } from "./MainConstants";

export const Main = memo( () => {

    const dispatch = useDispatch();
    const tasksError = useSelector( tasksSelectorError );
    const tasksHasError = useSelector( tasksSelectorHasError );
    const tasksIsLoading = useSelector( tasksSelectorIsLoading );
    const usersError = useSelector( usersSelectorError );
    const usersHasError = useSelector( usersSelectorHasError );
    const usersIsLoading = useSelector( usersSelectorIsLoading );

    const restart = useCallback( () => {
        dispatch( usersLoadAction() );
        dispatch( loadTasksAction() );
    }, [ dispatch ] );

    if (
        usersHasError ||
        usersIsLoading ||
        tasksHasError ||
        tasksIsLoading
    ) {
        return (
            <Preloader
                error={ usersError ?? tasksError }
                hasError={ usersHasError || tasksHasError }
                onTryAgain={
                    !usersIsLoading &&
                    !tasksIsLoading
                        ? restart
                        : undefined
                }
            />
        );
    }

    return (
        <Grid container >
            <Grid
                xs={ 12 }
                item
            >
                <Typography
                    p={ 2 }
                    textAlign="center"
                    variant="h1"
                >
                    { MAIN_TEXT_HEADER }
                </Typography>
            </Grid>
            <Grid
                p={ 2 }
                xs={ 6 }
                item
            >
                <Users />
            </Grid>
            <Grid
                p={ 2 }
                xs={ 6 }
                item
            >
                <Tasks />
            </Grid>
        </Grid>
    );
} );

Main.displayName = "Main";
