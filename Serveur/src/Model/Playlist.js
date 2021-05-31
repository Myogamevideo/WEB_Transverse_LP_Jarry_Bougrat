import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: String,
    description: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
}, { collection: 'Playlist' });

export const Playlist = mongoose.model('Playlist', playlistSchema);