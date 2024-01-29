const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
},{
    timestamps: true,
    versionKey: false,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;