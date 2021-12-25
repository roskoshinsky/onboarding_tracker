import {
    memo,
    useCallback,
    useMemo,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    usersActions,
    usersSelectors,
} from "../UsersStore";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../UsersHelpers";
import {
    USERS_AVATAR_MARGIN,
    USERS_AVATAR_SIZE,
} from "../UsersConstants";
import { UserProps } from "../UsersTypes";
import { UserGridStyled } from "../UserStyles";

export const User = memo( ( {
    id,
}: UserProps ) => {

    const dispatch = useDispatch();
    const users = useSelector( usersSelectors.users );
    const user = users?.[ id ];
    const userIdSelected = useSelector( usersSelectors.userIdSelected );
    const isUserSelected = id === userIdSelected;

    const userSelectHandler = useCallback( () => {
        dispatch( usersActions.userIdSelectedSet( id ) );
    }, [
        dispatch,
        id,
    ] );

    const userView = useMemo( () => {

        if ( !user ) {
            return null;
        }

        const {
            email,
            name,
            username,
        } = user;

        return (
            <UserGridStyled
                data-testid={ `user${ id }` }
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                p={ 2 }
                selected={ isUserSelected }
                container
                onClick={ userSelectHandler }
            >
                <Grid
                    alignSelf="center"
                    lg={ 2 }
                    md={ 3 }
                    sm={ 4 }
                    textAlign="center"
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    width={ USERS_AVATAR_SIZE + USERS_AVATAR_MARGIN * 2 }
                    xs={ 12 }
                    item
                >
                    <Avatar { ...stringAvatar( name ) } />
                </Grid>
                <Grid
                    lg={ 10 }
                    md={ 9 }
                    sm={ 8 }
                    xs={ 12 }
                    item
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        { name }
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        { username }
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        { email }
                    </Typography>
                </Grid>
            </UserGridStyled>
        );

    }, [
        id,
        isUserSelected,
        user,
        userSelectHandler,
    ] );

    return userView;
} );

User.displayName = "User";
