import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    dateOfBirth: Date,
    playlists: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
    musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    token: String
}, { collection: 'User' });

export const User = mongoose.model('User', userSchema);