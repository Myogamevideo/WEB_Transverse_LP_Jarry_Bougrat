import mongoose, { mongo } from 'mongoose';

const musicSchema = new mongoose.Schema({
    title: String,
    duration: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    feat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { collection: 'Music' });

export const Music = mongoose.model('Music', musicSchema);