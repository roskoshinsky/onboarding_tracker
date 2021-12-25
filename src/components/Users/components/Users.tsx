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
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
    usersActions,
    usersSelectors,
} from "../UsersStore";
import {
    USERS_TEXT_HEADER,
    USERS_URL,
    USERS_URL_REG_EXP,
} from "../UsersConstants";
import { User } from "./User";

export const Users = memo( () => {

    const dispatch = useDispatch();
    const isLoading = useSelector( usersSelectors.isLoading );
    const isReady = useSelector( usersSelectors.isReady );
    const location = useLocation();
    const navigate = useNavigate();
    const userIdSelected = useSelector( usersSelectors.userIdSelected );
    const users = useSelector( usersSelectors.users );
    const usersScope = useSelector( usersSelectors.users );

    useEffect( () => {
        if ( USERS_URL_REG_EXP.test( location.pathname ) ) {
            const usersRegExpMatch = location.pathname.match( USERS_URL_REG_EXP );
            const userIdURL = Number( usersRegExpMatch?.[ 1 ] ?? 0 );
            if (
                !userIdSelected &&
                userIdURL &&
                usersScope?.[ userIdURL ]
            ) {
                dispatch( usersActions.userIdSelectedSet( userIdURL ) );
            } else if (
                userIdSelected &&
                userIdURL &&
                userIdURL !== userIdSelected
            ) {
                navigate( `${ USERS_URL }${ userIdSelected }` );
            }
        } else if ( userIdSelected ) {
            navigate( `${ USERS_URL }${ userIdSelected }` );
        } else if ( location.pathname !== "/" ) {
            navigate( "/" );
        }
    }, [
        dispatch,
        location,
        navigate,
        usersScope,
        userIdSelected,
    ] );

    const usersLoad = useCallback( () => {
        dispatch( usersActions.usersLoad() );
    }, [ dispatch ] );

    useEffect( () => {
        if (
            !isLoading &&
            !isReady
        ) {
            usersLoad();
        }
    }, [
        isLoading,
        isReady,
        usersLoad,
    ] );

    const usersView = useMemo( () => {
        const usersViewScope: ReactNode[] = [];
        if (
            !isReady ||
            !users
        ) {
            return usersViewScope;
        }
        for ( const userId in users ) {
            usersViewScope.push(
                <Grid
                    key={ `user_${ userId }` }
                    xs={ 12 }
                    item
                >
                    <User id={ Number( userId ) } />
                </Grid>,
            );
        }
        return usersViewScope;
    }, [
        isReady,
        users,
    ] );

    if ( !isReady ) {
        return null;
    }

    return (
        <Paper square >
            <Grid p={ 1 } container >
                <Grid
                    p={ 2 }
                    xs={ 12 }
                    item
                >
                    <Typography
                        data-testid="usersHeader"
                        variant="h3"
                    >
                        { USERS_TEXT_HEADER }
                    </Typography>
                </Grid>
                { usersView }
            </Grid>
        </Paper>
    );
} );

Users.displayName = "Users";
