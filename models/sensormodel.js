const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



// SensorSchema
const SensorSchema = mongoose.Schema({
    
    _id: Date,
    values: {
        
        gas: {
            type: Number,
            required: true
            
        },
        motion: {
            type: String,
            required: true
        },
        distance: {
            type: Number,
            required: true
        }
    }
    
});

const Sensor = module.exports = mongoose.model('Sensor', SensorSchema);



module.exports.addValues = function (newValues, callback) {
    
    newValues.save(callback);
    
}

module.exports.getValues = function (callback) {
    
    Sensor.find({},callback);
    
}

module.exports.getValuesPerLimit = function(limit, callback){
    
    Sensor
    .find({})
    .sort({_id:-1})
    .skip(limit)
    .limit(12)
    .exec(callback);

    
}

module.exports.getLastValue = function(callback){
    

    Sensor.find({}).sort({_id:-1}).limit(1).exec(callback);
   
}


module.exports.addValueFake = function(newValue, callback){
    

    newValue.save(callback);
   
}