import type { NextApiRequest, NextApiResponse } from 'next';
import { db, Entry, entrySeedData } from '../../database';

type ResponseData = {
    message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({ message: 'This service is not available during production.' });
    }

    try {
        await db.connect();
        await Entry.deleteMany();
        await Entry.insertMany(entrySeedData);
        await db.disconnect();
        res.status(200).json({ message: 'Process completed successfully.' });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: 'Something went wrong on the server side.' });
    }
}

export default handler;