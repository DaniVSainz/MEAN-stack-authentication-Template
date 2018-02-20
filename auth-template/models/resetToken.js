const User = require('./user');
const mongoose = require('mongoose');

const ResetTokenSchema =  mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires:'15s' }
});

const Token = module.exports = mongoose.model('ResetToken', ResetTokenSchema);
