const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// schema that allows us to have a data model
const noteSchema = new mongoose.Schema(
    {
    user: {
        // an object ID from a schema
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // refering to which schema
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        // new notes are not completed by default
        default: false
    },
},
{
    // give createdat & updatedat timestamps
    timestamps: true
}

);

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    // separate counter collection
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema);