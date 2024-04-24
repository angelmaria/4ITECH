import { DifficultyLevel } from "./difficultyLevel.model";
import { Room } from "./room.model";
import { Track } from "./track.model";
import { User } from "./user.model";
import { UserRole } from "./userRole.model";

export interface Keynote {

    id: number;
    title: string; 
    summary: string;
    description: string;
    photoUrl: string; 
    webinarUrl: string;
    // one to one
    room: Room;
    maxNumPersons: number;
    // active boolean --> cambiar de true a false para archivar

    // enumerated
    difficultyLevel: DifficultyLevel; // crear clase
    durationInMin: number;
    // many to one
    speaker: User; // crear clase
    // manyToOne
    track: Track;

    // ManyToMany
    attendees: User[]; // ??

    visible: boolean;
}