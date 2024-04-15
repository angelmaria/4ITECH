import { UserRole } from "./userRole.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
    address: string;
    userRole: UserRole;
    photoUrl: string;

}