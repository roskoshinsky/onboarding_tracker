import { AsyncInterface } from "../../types";

export interface PreloaderProps extends
    Partial<Pick<
    AsyncInterface,
    "hasError" |
    "error"
    >>{
    onTryAgain?: () => void;
}
