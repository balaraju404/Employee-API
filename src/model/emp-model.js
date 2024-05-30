const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    workMail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    team: {
        type: String,
        required: true,
        trim: true
    }
});

const Employee = mongoose.model('employees', empSchema);

module.exports = Employee;