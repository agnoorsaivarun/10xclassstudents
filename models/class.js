const mongooose = require('mongoose');

const classSchema = new mongooose.Schema({
    // Your code goes here
    _id: Number,
    class: String,
    StudentCount: String
})

const classes = mongooose.model('10xclasses', classSchema);

module.exports = classes;