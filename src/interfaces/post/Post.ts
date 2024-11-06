import { User } from "../user/User";

export interface Post {
    id: number;
    title: string;
    content: string;
    publishedBy: User
    createdAt: string;
    updatedAt: string;
}