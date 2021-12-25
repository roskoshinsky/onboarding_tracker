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
    usersActions,
    usersSelectors,
} from "../Users";
import {
    Tasks,
    tasksActions,
    tasksSelectors,
} from "../Tasks";
import { MAIN_TEXT_HEADER } from "./MainConstants";

export const Main = memo( () => {

    const dispatch = useDispatch();
    const tasksError = useSelector( tasksSelectors.error );
    const tasksHasError = useSelector( tasksSelectors.hasError );
    const tasksIsLoading = useSelector( tasksSelectors.isLoading );
    const usersError = useSelector( usersSelectors.error );
    const usersHasError = useSelector( usersSelectors.hasError );
    const usersIsLoading = useSelector( usersSelectors.isLoading );

    const restart = useCallback( () => {
        dispatch( usersActions.usersLoad() );
        dispatch( tasksActions.tasksLoad() );
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
