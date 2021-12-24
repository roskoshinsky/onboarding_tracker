import { AsyncInterface } from "../../types";

export interface UserInterface {
    email: string;
    id: number;
    name: string;
    username: string;
}

export type UserListType = UserInterface[];

export interface UsersHashType {
    [id: number]: UserInterface;
}

export interface UsersState extends AsyncInterface {
    userIdSelected?: number;
    users?: UsersHashType;
}

export type UserProps = Pick<UserInterface, "id">;

export const isUserInterface = ( value: any ): value is UserInterface => {
    if (
        value &&
        typeof value === "object" &&
        value.id &&
        value.name &&
        value.username &&
        value.email
    ) {
        return true;
    }
    return false;
};
