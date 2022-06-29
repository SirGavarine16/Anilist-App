import type { NextApiRequest, NextApiResponse } from 'next';

import { apiResponses, EntryData } from '../../../../constants';
import { db, Entry } from '../../../../database';

type ResponseData =
    | { message: string; }
    | { message: string, result: EntryData };

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const { method } = req;
    const { _id } = req.query;

    switch (method) {
        case 'GET':
            return getEntry(_id as string, res);
        case 'PUT':
            return putEntry(req, res);
        case 'DELETE':
            return deleteEntry(_id as string, res);
        default:
            return res.status(400).json({ message: apiResponses.endpointUnknown });
    }
}

const getEntry = async (_id:string, res: NextApiResponse<ResponseData>) => {
    try {
        await db.connect()

        const entry = await Entry.findById(_id).lean();
        
        await db.disconnect();

        if (!entry) return res.status(400).json({ message: 'Entry ID does not exist.' });

        res.status(200).json({ message: 'GET Entry request was successfully fulfilled.', result: entry as EntryData });
    } catch (error) {
        await db.disconnect();
        console.log({ error });
        res.status(500).json({ message: apiResponses.error });
    }
}

const putEntry = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const { _id } = req.query;

    try {
        await db.connect();

        const entryToUpdate = await Entry.findById(_id);

        if (!entryToUpdate) return res.status(400).json({ message: 'Entry ID does not exist.' });

        const {
            name = entryToUpdate.name,
            totalEpisodes = entryToUpdate.totalEpisodes,
            progress = entryToUpdate.progress,
            addedBy = entryToUpdate.addedBy,
            status = entryToUpdate.status,
        } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate(_id, {
            name, totalEpisodes, progress, addedBy, status, updatedAt: Date.now(),
        }, {
            runValidators: true, new: true,
        });

        await db.disconnect();

        res.status(200).json({ message: 'PUT Entry request was successfully fulfilled.', result: updatedEntry as EntryData });
    } catch (error) {
        await db.disconnect();
        console.log({ error });
        res.status(500).json({ message: apiResponses.error });
    }
}

const deleteEntry = async (_id: string, res: NextApiResponse<ResponseData>) => {
    try {
        await db.connect();

        const entryToDelete = await Entry.findById(_id);

        if (!entryToDelete) return res.status(400).json({ message: 'Entry ID does not exist.' });

        await Entry.findByIdAndDelete(_id);

        await db.disconnect();

        res.status(200).json({ message: 'DELETE Entry request was successfully fulfilled.' });
    } catch (error) {
        await db.disconnect();
        console.log({ error });
        res.status(500).json({ message: apiResponses.error });
    }
}

export default handler;