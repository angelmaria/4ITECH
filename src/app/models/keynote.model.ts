import { DifficultyLevel } from "./difficultyLevel.model";
import { Room } from "./room.model";
import { UserRole } from "./userRole.model";

export interface Keynote {

    id: number;
    title: string; 
    summary: string;
    description: string; 
    webinarUrl: string;
    // one to one
    room: Room;
    maxNumPersons: number;

    // enumerated
    difficultyLevel: DifficultyLevel; // crear clase
    durationInMin: number;
    // many to one
    speaker: UserRole; // crear clase
    // manyToOne
    tracks: Date;

    // ManyToMany
    attendees: UserRole[]; // ??
}