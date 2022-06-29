import type { NextApiRequest, NextApiResponse } from 'next';

import { apiResponses, EntryData } from '../../../constants';
import { db, Entry } from '../../../database';

type ResponseData = 
    |   { message: string; }
    |   { message: string; results: EntryData[] }
    |   { message: string; result: EntryData };

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const { method } = req;
    switch(method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return postEntry(req, res);
        default:
            return res.status(400).json({ message: apiResponses.endpointUnknown });
    }
}

const getEntries = async (res: NextApiResponse<ResponseData>) => {
    try {
        await db.connect();

        const entries = await Entry.find().sort({ createdAt: 'asc' }).lean();

        await db.disconnect();

        res.status(200).json({ message: 'GET Entries request was successfully fulfilled.', results: entries});
    } catch(error) {
        await db.disconnect()
        console.log({ error });
        res.status(500).json({ message: apiResponses.error });
    }
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const { name, totalEpisodes, progress, addedBy } = req.body;

    if (!name || !totalEpisodes || !progress || !addedBy ) {
        return res.status(400).json({ message: apiResponses.missingBody })
    }

    const newRequest = new Entry({
        name,
        totalEpisodes,
        progress,
        addedBy,
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    try {
        await db.connect();

        await newRequest.save();

        await db.disconnect();

        res.status(201).json({ message: 'POST Entries request was successfully fulfilled', result: newRequest as EntryData });
    } catch (error) {
        await db.disconnect();
        console.log({ error });
        res.status(500).json({ message: apiResponses.error });
    }
}

export default handler;