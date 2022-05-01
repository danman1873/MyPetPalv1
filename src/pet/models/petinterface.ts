import { User } from "src/auth/controllers/models/user.interface";

export interface Petfeed {
    id?: number;
    name?: string;
    weight?: number;
    type?: string;
    feedingTime?: Date;
    author: User;
    
}