import {
    ReactNode,
    memo,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { usersSelectors } from "../../Users/UsersStore";
import {
    tasksActions,
    tasksSelectors,
} from "../TasksStore";
import { Task } from "./Task";
import {
    TASKS_TEXT_HEADER,
    TASKS_TEXT_NOT_FOUND,
    TASKS_TEXT_USER_IS_NOT_SELECTED,
} from "../TasksConstants";
import {
    TasksPosterStyled,
    TasksStyled,
} from "../TaskStyles";

export const Tasks = memo( () => {

    const dispatch = useDispatch();
    const isLoading = useSelector( tasksSelectors.isLoading );
    const isReady = useSelector( tasksSelectors.isReady );
    const tasks = useSelector( tasksSelectors.tasks );
    const userIdSelected = useSelector( usersSelectors.userIdSelected );

    const loadTasks = useCallback( () => {
        dispatch( tasksActions.tasksLoad() );
    }, [ dispatch ] );

    useEffect( () => {
        if (
            !isLoading &&
            !isReady
        ) {
            loadTasks();
        }
    }, [
        isLoading,
        isReady,
        loadTasks,
    ] );

    const tasksView = useMemo( () => {
        const tasksViewScope: ReactNode[] = [];
        if (
            !isReady ||
            !tasks
        ) {
            return tasksViewScope;
        }
        if ( !userIdSelected ) {
            return (
                <Grid
                    xs={ 12 }
                    item
                >
                    <TasksPosterStyled>
                        { TASKS_TEXT_USER_IS_NOT_SELECTED }
                    </TasksPosterStyled>
                </Grid>
            );
        }
        for ( const taskId in tasks ) {
            const { userId } = tasks[ Number( taskId ) ];
            if ( userId !== userIdSelected ) {
                continue;
            }
            tasksViewScope.push(
                <Grid
                    key={ `task_${ taskId }` }
                    xs={ 12 }
                    item
                >
                    <Task id={ Number( taskId ) } />
                </Grid>,
            );
        }
        if ( !tasksViewScope.length ) {
            return (
                <Grid
                    xs={ 12 }
                    item
                >
                    <Typography>
                        { TASKS_TEXT_NOT_FOUND }
                    </Typography>
                </Grid>
            );
        }
        return tasksViewScope;
    }, [
        isReady,
        tasks,
        userIdSelected,
    ] );

    if ( !isReady ) {
        return null;
    }

    return (
        <Paper square >
            <TasksStyled p={ 1 } container >
                <Grid
                    p={ 2 }
                    xs={ 12 }
                    item
                >
                    <Typography
                        data-testid="tasksHeader"
                        variant="h3"
                    >
                        { TASKS_TEXT_HEADER }
                    </Typography>
                </Grid>
                { tasksView }
            </TasksStyled>
        </Paper>
    );
} );

Tasks.displayName = "Tasks";
