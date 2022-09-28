import { User } from "src/user/entities/user.entity";

export class Todo {
    id?: string;
    value: string;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
}
