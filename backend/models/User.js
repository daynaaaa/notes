const mongoose = require('mongoose');

// schema that allows us to have a data model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // array!! []
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        // new users should be active by default
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);