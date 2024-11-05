import { User } from "../user/User";

export interface Comment {
    id: number;
    content: string;
    post_id: number;
    commentBy: User
    createdAt: string;
    updatedAt: string;
}