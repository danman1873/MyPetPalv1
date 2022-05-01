import { Role } from "./role.enum";
import { FeedPost } from "src/feed/models/postinterface";
import { Petfeed } from "src/pet/models/petinterface";
import { AppointmentLog } from "src/appointment/models/appointment.interface";



export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
    posts?: FeedPost[];
    pets?: Petfeed[];
    appointments?: AppointmentLog[];
}