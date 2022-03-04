const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var allocationSchema = new Schema({
    
   
    username: String,
    registerid : String,
    common: String
    
    
    
   
});

var Allocation = mongoose.model('allocations', allocationSchema);

module.exports = Allocation;