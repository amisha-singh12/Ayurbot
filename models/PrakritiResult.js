const mongoose = require('mongoose');

const prakritiResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scores: {
        vata: { type: Number, required: true },
        pitta: { type: Number, required: true },
        kapha: { type: Number, required: true }
    },
    dominantDosha: {
        type: String,
        enum: ['vata', 'pitta', 'kapha'],
        required: true
    },
    testDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PrakritiResult', prakritiResultSchema);
