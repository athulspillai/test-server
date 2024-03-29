// User.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
        default: null,
    },
    forms: [{
        type: String, 
    }],
    reports: [{
        type: String,
    }],
    hasUnreadMessages: {
        type: Boolean,
        default: false
    },
    leadProcessing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Leadprocessing'
        }
    ],
    lastLogin: {
        type: String,
        default: null // This will be the default value if the user has never logged in
    },
});

const User = mongoose.model('User', userSchema);

export default User;


