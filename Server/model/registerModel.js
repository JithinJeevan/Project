const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var registerSchema = new Schema({
    fname: String,
    sname: String,
    email: String,
    password: String,
    username: String,
    mobile:String,
    registerid : String,
    quali : String,
    approval: Boolean,
    course: Array,
    image: String,
    jobtype: String,
    skill: Array
});

var Register = mongoose.model('registers', registerSchema);

module.exports = Register;







