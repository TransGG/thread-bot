const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({

    _id: { type: String, required: true }, // Channel ID for the thread
    name: { type: String, required: true }, // Name for the thread | Used in search indexing
    weekly: { type: Number, require: true,  default: 1 }, // Total messages this week for this thread
    total: { type: Number, require: true, default: 1 }, // Total messages tracked for this thread
    created: { type: Number, require: true, default: Date.now() }, // First tracked message timestamp
    lastActive: { type: Number, require: true, default: Date.now() }, // First tracked message timestamp
    types: [], // Array of strings, each string is a type/genre for the thread

});

module.exports = mongoose.model('Threads', threadSchema);
