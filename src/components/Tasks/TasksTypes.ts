import { AsyncInterface } from "../../types";

export interface TaskInterface {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
}

export type TaskListType = TaskInterface[];

export interface TasksHashType {
    [id: number]: TaskInterface;
}

export interface UserToTasksHashType {
    [id: number]: number[];
}

export interface TasksState extends AsyncInterface {
    tasks?: TasksHashType;
    userToTasks?: UserToTasksHashType;
}

export type TaskProps = Pick<TaskInterface, "id">;

export const isTaskInterface = ( value: any ): value is TaskInterface => {
    if (
        value &&
        typeof value === "object" &&
        value.completed !== undefined &&
        value.id &&
        value.title &&
        value.userId
    ) {
        return true;
    }
    return false;
};
