import { USERS_AVATAR_SIZE } from "./UsersConstants";

export function stringToColor ( string: string ) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers */
    for ( i = 0; i < string.length; i += 1 ) {
        hash = string.charCodeAt( i ) + ( ( hash << 5 ) - hash );
    }

    let color = "#";

    for ( i = 0; i < 3; i += 1 ) {
        const value = hash >> i * 8 & 0xff;
        color += `00${ value.toString( 16 ) }`.substr( -2 );
    }
    /* eslint-enable no-bitwise, @typescript-eslint/no-magic-numbers */

    return color;
}

export function stringAvatar ( name: string ) {
    return {
        sx: {
            bgcolor: stringToColor( name ),
            display: "inline-flex",
            height : USERS_AVATAR_SIZE,
            width  : USERS_AVATAR_SIZE,
        },
        children: `${ name.split( " " )[ 0 ][ 0 ] }${ name.split( " " )[ 1 ][ 0 ] }`,
    };
}
