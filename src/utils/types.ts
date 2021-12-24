export type FunctionAnyParametersAnyReturn = ( ...args: any[] ) => any;

export type ArgumentTypes<
    F extends FunctionAnyParametersAnyReturn
> = F extends ( ...args: infer A ) => any ? A : never;
