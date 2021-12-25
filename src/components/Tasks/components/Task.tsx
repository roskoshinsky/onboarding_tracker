import {
    memo,
    useCallback,
    useMemo,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    tasksActions,
    tasksSelectors,
} from "../TasksStore";
import { TaskProps } from "../TasksTypes";

export const Task = memo( ( {
    id,
}: TaskProps ) => {

    const dispatch = useDispatch();
    const tasks = useSelector( tasksSelectors.tasks );
    const task = tasks?.[ id ];

    const taskCompleteHandler = useCallback( () => {
        dispatch( tasksActions.taskComplete( id ) );
    }, [
        dispatch,
        id,
    ] );

    const taskView = useMemo( () => {

        if ( !task ) {
            return null;
        }

        const {
            completed,
            title,
        } = task;

        return (
            <Grid
                data-testid={ `task${ id }` }
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                p={ 2 }
                container
            >
                <Grid
                    alignSelf="center"
                    md={ 2 }
                    sm={ 3 }
                    textAlign="center"
                    width={ 40 }
                    xs={ 12 }
                    item
                >
                    <Checkbox
                        checked={ completed }
                        disabled={ completed }
                        onChange={ taskCompleteHandler }
                    />
                </Grid>
                <Grid
                    md={ 10 }
                    sm={ 9 }
                    xs={ 12 }
                    item
                >
                    <Typography
                        variant="h6"
                    >
                        #{ id } { title }
                    </Typography>
                </Grid>
            </Grid>
        );

    }, [
        id,
        task,
        taskCompleteHandler,
    ] );

    return taskView;
} );

Task.displayName = "Task";
