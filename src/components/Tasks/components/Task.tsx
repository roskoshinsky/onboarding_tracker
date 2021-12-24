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
    tasksSelectorTasks,
} from "../TasksStore";
import { TaskProps } from "../TasksTypes";

export const Task = memo( ( {
    id,
}: TaskProps ) => {

    const dispatch = useDispatch();
    const tasks = useSelector( tasksSelectorTasks );
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
                    textAlign="center"
                    width={ 40 }
                    item
                >
                    <Checkbox
                        checked={ completed }
                        disabled={ completed }
                        onChange={ taskCompleteHandler }
                    />
                </Grid>
                <Grid
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
