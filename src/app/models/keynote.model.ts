import { DifficultyLevel } from "./difficultyLevel.model";
import { UserRole } from "./userRole.model";

export interface Keynote {
    difficultyLevel: any;
    id: number;
    title: string; 
    summary: string;
    description: string; 
    webinarUrl: string;
    // one to one
    room: string;
    maxNumPersons: number;

    // enumerated
    level: DifficultyLevel; // crear clase
    durationInMin: number;
    // many to one
    speaker: UserRole; // crear clase
    // manyToOne
    tracks: Date;

    // ManyToMany
    attendees: UserRole[]; // ??
}