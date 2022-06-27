import { EntryAuthor, EntryStatus } from "../types";

export interface EntryData {
    _id: string;
    name: string;
    totalEpisodes: number;
    progress: number;
    addedBy: EntryAuthor;
    status: EntryStatus;
    createdAt: number;
    updatedAt: number;
}