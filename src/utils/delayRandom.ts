import { randomInt } from "./randomInt";
import {
    ArgumentTypes,
    FunctionAnyParametersAnyReturn,
} from "./types";

const DELAY_RANDOM_MS_MAX = 2500;
const DELAY_RANDOM_MS_MIN = 500;

export const delayRandom = async <F extends FunctionAnyParametersAnyReturn>(
    f: F,
    ...args: ArgumentTypes<F>
) => new Promise <ReturnType<typeof f>>( ( resolve ) => {
    setTimeout( () => {
        resolve( f.apply( this, args ) );
    }, randomInt(
        DELAY_RANDOM_MS_MIN,
        DELAY_RANDOM_MS_MAX,
    ) );
} );
