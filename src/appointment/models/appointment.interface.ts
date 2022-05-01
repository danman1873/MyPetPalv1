
import { User } from "src/auth/controllers/models/user.interface";
import { Petfeed } from "src/pet/models/petinterface";

export interface AppointmentLog {
    id?: number;
    date?: Date;
    description?: string;
    petName?: string;
    author: User;

}