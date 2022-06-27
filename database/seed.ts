import { EntryAuthor, EntryStatus } from "../constants";

interface Entry {
    name: string,
    totalEpisodes: number;
    progress: number;
    addedBy: EntryAuthor,
    status: EntryStatus,
    createdAt: number,
    updatedAt: number,
}

export const entrySeedData: Entry[] = [
    {
        name: 'Fate Zero',
        totalEpisodes: 24,
        progress: 9,
        addedBy: 'Daniel',
        status: 'current',
        createdAt: 1656355031186,
        updatedAt: 1656355031186,
    },{
        name: 'Kimi no Suizou wo Tabetai',
        totalEpisodes: 1,
        progress: 1,
        addedBy: 'Sofía',
        status: 'completed',
        createdAt: 1656355031186,
        updatedAt: 1656355105383,
    },{
        name: 'Mato Seihei no Slave',
        totalEpisodes: 12,
        progress: 9,
        addedBy: 'Daniel',
        status: 'pending',
        createdAt: 1556355031186,
        updatedAt: 1556355031186,
    },
]