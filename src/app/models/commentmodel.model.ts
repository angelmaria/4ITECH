import { Keynote } from "./keynote.model";
import { User } from "./user.model";

export interface CommentModel {
    id: number;
    rating: number; 
    opinion: string;
    dateTime: Date;
    // Many to One:  findByUser_id
    user?: User; 
    // Many to One:  findByKeynote_id
    keynote?: Keynote;

}