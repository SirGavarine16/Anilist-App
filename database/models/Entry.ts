import mongoose, { Model, Schema } from 'mongoose';

import { EntryData } from '../../constants';

export interface EntryModel extends EntryData {
}

const entrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    totalEpisodes: {
        type: Number,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    addedBy: {
        type: String,
        enum: {
            values: ['Daniel', 'Sofía'],
            message: '{VALUE} is not allowed as an entry author.',
        },
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'current', 'completed'],
            message: '{VALUE} is not allowed as an entry status.',
        },
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    updatedAt: {
        type: Number,
        required: true,
    },
});

const Entry: Model<EntryModel> =
    mongoose.models.Entry 
    ||
    mongoose.model('Entry', entrySchema);

export default Entry;