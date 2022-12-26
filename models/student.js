const mongooose = require('mongoose');

const studentSchema = new mongooose.Schema({
    // Your code goes here
    name: String,
    classId: String,
    _id: Number
})

const students = mongooose.model('10xstudents', studentSchema);

module.exports = students;